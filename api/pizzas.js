require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { requireUser } = require("./utils");

router.get("/", (req, res, next) => {
  res.send("Request being sent to /api/pizzas");
});

module.exports = router;
