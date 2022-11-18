const express = require("express");
const router = express.Router();

const { requireUser, requireAdmin } = require("./utils");
const {
  getAllFeaturedPizzas,
  getPizzaById,
  getPizzaByName,
  createPizza,
  destroyPizza,
  updatePizza,
} = require("../db/pizzas");
const { getUserByEmail } = require("../db/users");
const {
  removePizzaToppings,
  getPizzaToppingsByPizza,
  addToppingToPizza,
} = require("../db/pizza_toppings");
const { getCrustById } = require("../db/crusts");
const { getSizeById } = require("../db/sizes");
const { removePizzaFromOrder } = require("../db/pizza_order");

router.get("/featured", async (req, res, next) => {
  const pizzas = await getAllFeaturedPizzas();
  res.send(pizzas);
});

router.get("/:pizzaId", async (req, res, next) => {
  const { pizzaId } = req.params;
  const pizza = await getPizzaById(pizzaId);
  if (!pizza) {
    next({
      error: "PizzaNotFound",
      message: `A pizza with ID ${pizzaId} does not exist.`,
      name: "Pizza Not Found",
    });
  } else {
    try {
      res.send(pizza);
    } catch (error) {
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  const { name, crustId, userId, sizeId, featured } = req.body;
  const _pizza = await getPizzaByName(name);

  if (_pizza && featured) {
    next({
      error: "PizzaAlreadyExists",
      name: "Pizza Already Exists",
      message: `A Pizza with the name ${name} already exists.`,
    });
    return;
  }

  if (!crustId || !sizeId || featured === null) {
    next({
      error: "MissingInformation",
      name: "MissingInformation",
      message: `Please provide a crustId, sizeId and featured.`,
    });
  }
  if (featured && !name) {
    next({
      error: "FeaturedNeedsName",
      name: "Featured Needs Name",
      message: "You must give featured pizzas a name.",
    });
  } else {
    try {
      const pizza = await createPizza({
        name,
        crustId,
        userId,
        sizeId,
        featured,
      });
      res.send(pizza);
    } catch (error) {
      next(error);
    }
  }
});

router.post("/:pizzaId/toppings", async (req, res, next) => {
  const { pizzaId } = req.params;
  const { toppingId, amount, double } = req.body;

  const toppings = await getPizzaToppingsByPizza({ id: pizzaId });

  if (toppings) {
    for (let topping of toppings) {
      if (topping.toppingId === pizzaId) {
        next({
          error: "ToppingAlreadyExists",
          name: "Topping Already Exists",
          message: `A topping with the Topping ID: ${toppingId} already exists on Pizza ID: ${pizzaId}.`,
        });
      }
    }
  }
  try {
    const response = await addToppingToPizza({
      pizzaId,
      toppingId,
      amount,
      double,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:pizzaId", async (req, res, next) => {
  const { pizzaId } = req.params;
  const { name, crustId, userId, sizeId, featured } = req.body;
  const pizza = await getPizzaById(pizzaId);
  const updateFields = {};

  if (!pizza) {
    next({
      error: "PizzaNotFound",
      name: "pizza Not Found",
      message: "Unable to find a pizza associated to that ID.",
    });
  } else {
    if (name) {
      const _pizza = await getPizzaByName(name);
      if (_pizza) {
        next({
          error: "PizzaAlreadyExists",
          name: "Pizza Already Exists",
          message: `A pizza with the name ${name} already exists.`,
        });
      }
      updateFields.name = name;
    }
    if (crustId) {
      const _crust = await getCrustById(crustId);
      if (!_crust) {
        next({
          error: "CrustNotFound",
          name: "Crust Not Found",
          message: `Unable to find crust associated with ID: ${crustId}`,
        });
      }
      updateFields.crustId = _crust.id;
    }
    if (sizeId) {
      const _size = await getSizeById(sizeId);
      if (!_size) {
        next({
          error: "SizeNotFound",
          name: "Size Not Found",
          message: `Unable to find size associated with ID: ${size}`,
        });
      }
      updateFields.sizeId = _size.id;
    }
    if (featured === null) {
      updateFields.featured = pizza.featured;
    } else {
      updateFields.featured = featured;
    }

    if (pizza.featured && !user.admin) {
      {
        next({
          error: "NotYourPizza",
          message: `A pizza with the ID ${pizzaId} does not belong to you (ADMIN).`,
          name: "Not Your Pizza",
        });
      }
    }

    try {
      const updatedPizza = await updatePizza({
        id: pizza.id,
        ...updateFields,
      });
      res.send(updatedPizza);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:pizzaId", async (req, res, next) => {
  const { pizzaId } = req.params;
  const pizza = await getPizzaById(pizzaId);
  const user = await getUserByEmail(req.user.email);

  if (!pizza) {
    next({
      error: "PizzaNotFound",
      message: `A pizza with the ID ${pizzaId} does not exist.`,
      name: "Pizza Not Found",
    });
    return;
  }

  if (!user.admin && pizza.userId !== user.id) {
    next({
      error: "NotYourPizza",
      message: `A pizza with the ID ${pizzaId} does not belong to you.`,
      name: "Not Your Pizza",
    });
  }

  if (pizza.featured && !user.admin) {
    {
      next({
        error: "NotYourPizza",
        message: `A pizza with the ID ${pizzaId} does not belong to you (ADMIN).`,
        name: "Not Your Pizza",
      });
    }
  } else {
    try {
      const removed = await removePizzaToppings(pizzaId);
      const removedPizza = await removePizzaFromOrder(pizzaId);
      const response = await destroyPizza(pizzaId);
      console.log(response);
      res.send({
        success: true,
        message: `${pizza.name} has successfully been deleted.`,
      });
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
