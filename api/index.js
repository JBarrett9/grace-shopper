const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    let token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.get("/health", async (req, res, next) => {
  try {
    res.send({ success: true, message: "I'm a healthy server!" });
  } catch (error) {
    next(error);
  }
});

const pizzasRouter = require("./pizzas");
const usersRouter = require("./users");
const toppingsRouter = require("./toppings");
const crustsRouter = require("./crusts");
const sizesRouter = require("./sizes");
const reviewsRouter = require("./reviews");
const pizzaToppingsRouter = require("./pizzaToppings");
const locationsRouter = require("./locations");
const ordersRouter = require("./orders");

router.use("/pizzas", pizzasRouter);
router.use("/users", usersRouter);
router.use("/toppings", toppingsRouter);
router.use("/crusts", crustsRouter);
router.use("/sizes", sizesRouter);
router.use("/reviews", reviewsRouter);
router.use("/pizza_toppings", pizzaToppingsRouter);
router.use("/orders", ordersRouter);

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

router.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
