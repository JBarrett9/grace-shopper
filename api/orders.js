const express = require("express");
const { getUserOrders, getOrderById, createOrder } = require("../db/orders");
const { getOrderPrice } = require("../db/prices");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", requireUser, (req, res, next) => {
  const { userId } = req.params;

  if (userId !== req.user.id) {
    res.status(403).send({
      error: `User is not authorized to access this cart`,
      message: `User is not authorized to access this cart`,
      name: `UserCartMismatchError`,
    });
  }
  try {
    const order = getUserOrders(userId);
    res.json(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.create("/:userId", requireUser, (req, res, next) => {
  const { userId } = req.params;
  const { delivery } = req.body;

  if (userId !== req.user.id) {
    res.status(403).send({
      error: `User is not authorized to access this cart`,
      message: `User is not authorized to access this cart`,
      name: `UserCartMismatchError`,
    });
  }

  try {
    const order = createOrder({ userId, active: true, price: 0, delivery });
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

    const price = getOrderPrice(orderId);

    const order = await updateOrder({ id: orderId, active, price, delivery });
    res.json(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
