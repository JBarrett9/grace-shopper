require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireAdmin } = require("./utils");
const {
  getAllSizes,
  getSizeById,
  getSizeByName,
  createSize,
  updateSize,
  deleteSize,
} = require("../db/sizes");
const { JWT_SECRET } = process.env;

router.get("/", async (req, res) => {
  const sizes = await getAllSizes();
  res.send(sizes);
});

router.post("/", requireAdmin, async (req, res, next) => {
  const { size } = req.body;
  const _size = await getSizeByName(size);
  if (_size) {
    next({
      error: "SizeAlreadyExists",
      name: "Size Already Exists",
      message: `A size with the name ${size} already exists.`,
    });
  } else {
    const newSize = await createSize({ size });
    res.send(newSize);
  }
});

router.patch("/:sizeId", requireAdmin, async (req, res, next) => {
  const { sizeId } = req.params;
  const { size } = req.body;
  const getSize = await getSizeById(sizeId);
  const updateFields = {};

  if (!getSize) {
    next({
      error: "SizeNotFound",
      name: "Size Not Found",
      message: `Unable to find size associated with ID: ${sizeId}`,
    });
  } else {
    if (getSize) {
      const _size = await getSizeByName(size);

      if (_size) {
        next({
          error: "SizeAlreadyExists",
          name: "Size Already Exists",
          message: `A size with the name ${size} already exists.`,
        });
      }
    }
    updateFields.size = size;
    try {
      const updatedSize = await updateSize({
        id: sizeId,
        ...updateFields,
      });
      res.send(updatedSize);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:sizeId", requireAdmin, async (req, res, next) => {
  const { sizeId } = req.params;

  const size = await getSizeById(sizeId);

  if (!size) {
    next({
      error: "SizeNotFound",
      message: `A size with the ID ${sizeId} does not exist.`,
      name: "Size Not Found",
    });
  }

  try {
    const response = await deleteSize(sizeId);
    res.send({
      success: true,
      message: `${size.size} has successfully been deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
