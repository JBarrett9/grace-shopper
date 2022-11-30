const express = require("express");
require("dotenv").config();
const { STRIPE_SECRET, STRIPE_WHSEC } = process.env;
const stripe = require("stripe")(STRIPE_SECRET);
const {
  getUserOrders,
  getOrderById,
  createOrder,
  getActiverUserOrders,
  updateOrder,
} = require("../db/orders");
const {
  getPizzasByOrder,
  addPizzaToOrder,
  getPizzaOrderIdsByOrder,
  updatePizzaOrder,
} = require("../db/pizza_order");
const { getOrderPrice } = require("../db/prices");
const { getToppingById } = require("../db/toppings");
const { getUserByEmail } = require("../db/users");
const router = express.Router();
const { requireUser } = require("./utils");

const handlePaymentIntentSucceeded = async (paymentIntent) => {
  console.log(paymentIntent);
  const email = paymentIntent.receipt_email;
  console.log(`Getting info for ${email}`);
  const user = getUserByEmail(email);

  console.log(`Getting orders for user: ${user.id}`);
  const active_orders = await getActiverUserOrders(user.id);

  console.log(`Updating order ${active_orders[0].id}`);
  const order = await updatePizzaOrder({
    id: active_orders[0].id,
    active: false,
  });
};

router.post("/:orderId/create-payment-intent", async (req, res) => {
  const { orderId } = req.params;
  const { email } = req.body;

  const price = await getOrderPrice(orderId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: email,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const endpointSecret = STRIPE_WHSEC;
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        handlePaymentIntentSucceeded(paymentIntent);

        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

router.get("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  if (userId !== req.user.id) {
    res.status(403).send({
      error: `User is not authorized to access this cart`,
      message: `User is not authorized to access this cart`,
      name: `UserCartMismatchError`,
    });
  }
  try {
    const order = await getUserOrders(userId);
    res.json(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/:userId/active", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const order = await getActiverUserOrders(userId);
    res.json(order[0]);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/order/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  console.log();
  const price = await getOrderPrice(orderId);
  await updateOrder({ id: orderId, price });
  const order = await getOrderById(orderId);
  if (order) {
    res.send(order);
  }
});

router.get("/:orderId/pizza_orders", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const pizzas = await getPizzaOrderIdsByOrder({ id: orderId });
    const ids = pizzas.map((pizza) => pizza.id);
    res.send(ids);
  } catch (error) {
    next(error);
  }
});

router.patch("/pizza_order/:pizzaOrderId", async (req, res, next) => {
  const { pizzaOrderId } = req.params;
  const { amount } = req.body;

  try {
    const pizzaOrder = await updatePizzaOrder({ id: pizzaOrderId, amount });
    res.send(pizzaOrder);
  } catch (error) {
    next(error);
  }
});

router.post("/:orderId/pizzas", async (req, res, next) => {
  const { orderId } = req.params;
  console.log(req.params);
  const { pizzaId, amount } = req.body;
  const pizzas = await getPizzasByOrder({ id: orderId });
  console.log(orderId, pizzaId, amount, pizzas);
  if (pizzas) {
    for (let pizza of pizzas) {
      if (pizza.pizzaId === pizzaId) {
        next({
          error: "PizzaAlready",
          name: "Pizza Already Exists",
          message: `A pizza with the Pizza ID: ${pizzaId} already exists on Pizza ID: ${pizzaId}.`,
        });
      }
    }
  }
  try {
    const response = await addPizzaToOrder({ pizzaId, orderId, amount });

    await getOrderPrice(orderId);

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { delivery } = req.body;

  //   if (userId !== req.user.id) {
  //     res.status(403).send({
  //       error: `User is not authorized to access this cart`,
  //       message: `User is not authorized to access this cart`,
  //       name: `UserCartMismatchError`,
  //     });
  //   }

  try {
    const order = await createOrder({
      userId,
      active: true,
      price: 0,
      delivery,
    });
    res.json(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { active, delivery } = req.body;

  try {
    const _order = await getOrderById(orderId);

    if (!_order) {
      res.status(404).send({
        name: "Order not found",
        message: "Order not found",
        error: "OrderNotFoundError",
      });
    }

    if (_order.userId !== req.user.id) {
      res.status(403).send({
        error: `User is not authorized to access this cart`,
        message: `User is not authorized to access this cart`,
        name: `UserCartMismatchError`,
      });
    }

    const price = await getOrderPrice(orderId);

    const order = await updateOrder({ id: orderId, active, price, delivery });
    res.json(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
