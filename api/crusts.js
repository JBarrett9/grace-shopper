require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireAdmin } = require("./utils");
const { getAllCrusts } = require("../db/crusts");
const { JWT_SECRET } = process.env;

router.get("/", async (req, res) => {
  const crusts = await getAllCrusts();
  res.send(crusts);
});

router.post("/", requireAdmin, async (req, res) => {
  const crusts = await getAllCrusts();
  res.send(crusts);
});

module.exports = router;
