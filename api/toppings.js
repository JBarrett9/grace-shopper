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
} = require("../db/toppings");
const { requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;

router.get("/", async (req, res) => {
  const toppings = await getAllToppings();
  res.send(toppings);
});

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const toppings = await getToppingsByCategory(category);
  res.send(toppings);
});

module.exports = router;
