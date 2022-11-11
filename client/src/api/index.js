const addPizzaToOrder = async (token, orderId, pizzaId, amount, navigate) => {
  await fetch(`/api/orders/${orderId}/pizzas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pizzaId,
      amount,
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const addToppingToPizza = async (token, pizzaId, toppingId, amount, double) => {
  await fetch(`/api/pizzas/${pizzaId}/toppings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      toppingId,
      amount,
      double,
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });
};

const createOrder = async (token, setOrderId) => {
  await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((result) => {
      setOrderId(result.id);
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createPizza = async (token, crustId, userId, sizeId, setPizza) => {
  await fetch("/api/pizzas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      crustId,
      userId,
      sizeId,
    }),
  })
    .then((response) => response.json())
    .then((result) => setPizza(result))
    .catch((error) => {
      console.log(error);
    });
};

const fetchCrusts = async (setCrusts) => {
  await fetch("/api/crusts", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setCrusts(result);
    })
    .catch(console.error);
};

const fetchPizza = async (pizzaId, setPizza) => {
  await fetch(`/api/pizzas/${pizzaId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setPizza(result))
    .catch(console.error);
};

const fetchFeaturedPizzas = async (setPizzas) => {
  await fetch("/api/pizzas/featured", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setPizzas(result))
    .catch(console.error);
};

const fetchSizes = async (setSizes) => {
  await fetch("/api/sizes", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setSizes(result))
    .catch(console.error);
};

export {
  addPizzaToOrder,
  createOrder,
  createPizza,
  fetchCrusts,
  fetchPizza,
  fetchFeaturedPizzas,
  fetchSizes,
};
