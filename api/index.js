const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.get("", (req, res, next) => {
  res.send("hi");
});

router.get("/health", async (req, res, next) => {
  try {
    res.send({ success: true, message: "I'm a healthy server!" });
  } catch (error) {
    next(error);
  }
});

const booksRouter = require("./books");
router.use("/books", booksRouter);

router.use("*", (req, res) => {
  res.status(404);
  res.send({
    name: "PageNotFound",
    message: "Page not found.",
  });
});

router.use((error, req, res, next) => {
  res.status(500).send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
