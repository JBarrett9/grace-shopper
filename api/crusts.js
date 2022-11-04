require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireAdmin } = require("./utils");
const {
  getAllCrusts,
  createCrust,
  getCrustByName,
  updateCrust,
  getCrustById,
  deleteCrust,
} = require("../db/crusts");
const { JWT_SECRET } = process.env;

router.get("/", async (req, res) => {
  const crusts = await getAllCrusts();
  res.send(crusts);
});

router.post("/", requireAdmin, async (req, res, next) => {
  const { name, price, quantity } = req.body;

  const _crust = await getCrustByName(name);
  if (_crust) {
    next({
      error: "CrustAlreadyExists",
      name: "Crust Already Exists",
      message: `A rust with the name ${name} already exists.`,
    });
  }
  if (price < 0) {
    next({
      error: "NegativePrice",
      name: "Negative Price",
      message: "You cannot have a negative price amount.",
    });
  }
  if (!name || !price || !quantity) {
    next({
      error: "MissingInformation",
      name: "MissingInformation",
      message: `Please provide a name, price, and quantity.`,
    });
  } else {
    try {
      const crust = await createCrust({ name, price, quantity });
      res.send(crust);
    } catch (error) {
      next(error);
    }
  }
});

router.patch("/:crustId", requireAdmin, async (req, res, next) => {
  const { crustId } = req.params;
  const { name, price, quantity, active } = req.body;
  const crust = await getCrustById(crustId);
  const updateFields = {};

  if (!crust) {
    next({
      error: "CrustNotFound",
      name: "Crust Not Found",
      message: `Unable to find crust associated with ID: ${crustId}`,
    });
  } else {
    if (name) {
      const _crust = await getCrustByName(name);
      if (_crust) {
        next({
          error: "CrustlreadyExists",
          name: "Crust Already Exists",
          message: `A crust with the name ${name} already exists.`,
        });
      }
      updateFields.name = name;
    }
    if (price) {
      updateFields.price = price;
    }
    if (quantity) {
      updateFields.quantity = quantity;
    }
    if (active) {
      updateFields.active = active;
    }
    try {
      const updatedCrust = await updateCrust({
        id: crustId,
        ...updateFields,
      });
      res.send(updatedCrust);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:crustId", requireAdmin, async (req, res, next) => {
  const { crustId } = req.params;

  const crust = await getCrustById(crustId);

  if (!crust) {
    next({
      error: "CrustNotFound",
      message: `A crust with the ID ${crustId} does not exist.`,
      name: "Crust Not Found",
    });
  }

  try {
    const response = await deleteCrust(crustId);
    res.send({
      success: true,
      message: `${crust.name} has successfully been deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
