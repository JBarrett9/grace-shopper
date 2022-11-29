const express = require("express");
require("dotenv").config();
const { STRIPE_SECRET } = process.env;
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
const router = express.Router();
const { requireUser } = require("./utils");

router.post("/:orderId/create-payment-intent", async (req, res) => {
  const { orderId } = req.params;

  const price = await getOrderPrice(orderId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

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
  const orderId = req.params;
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
