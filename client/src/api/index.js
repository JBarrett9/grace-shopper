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
    .then((result) => setOrderId(result.id))
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
  createOrder,
  fetchCrusts,
  fetchPizza,
  fetchFeaturedPizzas,
  fetchSizes,
};
