const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.get("", (req, res, next) => {
  res.send("hi");
});

module.exports = router;
