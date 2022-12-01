require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getToppingsByCategory,
  getAllToppings,
  getToppingByName,
  createTopping,
  updateTopping,
  getToppingById,
  deleteTopping,
} = require("../db/toppings");
const { requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;

router.get("/", async (req, res) => {
  const toppings = await getAllToppings();
  res.send(toppings);
});

router.get("/:toppingId",async (req, res) => {
  const topping = await getToppingById(req.params.toppingId)
  res.send(topping)
})

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const toppings = await getToppingsByCategory(category);
  res.send(toppings);
});

router.post("/", requireAdmin, async (req, res) => {
  const { name, price, quantity, category } = req.body;
  const _topping = await getToppingByName(name);
  if (_topping) {
    next({
      error: "ToppingAlreadyExists",
      name: "Topping Already Exists",
      message: `A topping with the name ${name} already exists.`,
    });
  }
  if (
    category !== "meat" &&
    category !== "cheese" &&
    category !== "vegetable" &&
    category !== "sauce"
  ) {
    next({
      error: "InvalidToppingCategory",
      name: "Invalid Topping Category",
      message: `${category} is not a valid category option.`,
    });
  }
  if (price < 0) {
    next({
      error: "NegativePrice",
      name: "Negative Price",
      message: "You cannot have a negative price amount.",
    });
  }
  if (!name || !price || !quantity || !category) {
    next({
      error: "MissingInformation",
      name: "MissingInformation",
      message: `Please provide a name, price, quantity and category.`,
    });
  } else {
    const topping = await createTopping({ name, price, quantity, category });
    res.send(topping);
  }
});

router.patch("/:toppingId", requireAdmin, async (req, res, next) => {
  const { toppingId } = req.params;
  const { name, price, quantity, category, active } = req.body;
  const updateFields = { name, price, quantity, category, active };
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const topping = await getToppingById(toppingId);

  if (!topping) {
    next({
      error: "ToppingNotFound",
      name: "Topping Not Found",
      message: "Unable to find a topping associated to that ID.",
    });
  } else {
    if (name) {
      const _topping = await getToppingByName(name);
      if (_topping) {
        next({
          error: "ToppingAlreadyExists",
          name: "Topping Already Exists",
          message: `A topping with the name ${name} already exists.`,
        });
      }
      updateFields.name = name;
    }
    if (category) {
      if (
        category !== "meat" &&
        category !== "cheese" &&
        category !== "vegetable"
      ) {
        next({
          error: "InvalidToppingCategory",
          name: "Invalid Topping Category",
          message: `${category} is not a valid category option.`,
        });
      }
      updateFields.category = category;
    }
    try {
      const updatedTopping = await updateTopping({
        id: toppingId,
        ...updateFields,
      });
      res.send(updatedTopping);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:toppingId", requireAdmin, async (req, res, next) => {
  const { toppingId } = req.params;

  const topping = await getToppingById(toppingId);

  if (!topping) {
    next({
      error: "ToppingNotFound",
      message: `A topping with the ID ${toppingId} does not exist.`,
      name: "Topping Not Found",
    });
  }

  try {
    await deleteTopping(toppingId);
    res.send({
      success: true,
      message: `${topping.name} has successfully been deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
