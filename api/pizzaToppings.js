const express = require("express");
const { getPizzaById } = require("../db/pizzas");
const {
  getPizzaToppingById,
  updatePizzaToppings,
  destroyPizzaTopping,
} = require("../db/pizza_toppings");
const router = express.Router();
const { requireUser } = require("./utils");

router.patch("/:pizzaToppingId", async (req, res, next) => {
  const { pizzaToppingId } = req.params;
  const { amount, double } = req.body;
  const { id, email } = req.user;
  const updateFields = { amount, double };
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const pizzaTopping = await getPizzaToppingById(pizzaToppingId);
  const pizza = await getPizzaById(pizzaTopping.pizzaId);

  if (id !== pizza.userId) {
    next({
      error: "NotOwnerOfPizza",
      message: `User ${email} is not allowed to update Pizza ID: ${pizza.id}`,
      name: "Not Owner of Pizza",
    });
    return;
  }
  try {
    const response = await updatePizzaToppings({
      id: pizzaToppingId,
      ...updateFields,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:pizzaToppingId", async (req, res) => {
  const { pizzaToppingId } = req.params;
  const { id, email } = req.user;

  const pizzaTopping = await getPizzaToppingById(pizzaToppingId);
  const pizza = await getPizzaById(pizzaTopping.pizzaId);

  if (id !== pizza.userId) {
    next({
      error: "NotOwnerOfPizza",
      message: `User ${email} is not allowed to update Pizza ID: ${pizza.id}`,
      name: "Not Owner of Pizza",
    });
    return;
  }

  try {
    const response = await destroyPizzaTopping(pizzaTopping.id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
