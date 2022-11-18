// import { response } from "express";

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

const createOrder = async (token, userId, setOrderId) => {
  const response = await fetch(`/api/orders/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
    }),
  });

  const data = await response.json();
  return data;
};

const createPizza = async (token, name, crustId, userId, sizeId, featured) => {
  console.log(featured);
  try {
    const response = await fetch("/api/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        crustId,
        userId,
        sizeId,
        featured,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const destroyPizza = async (token, pizzaId) => {
  try {
    await fetch(`/api/pizzas/${pizzaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const destroyPizzaToppings = async (pizzaId, token) => {
  try {
    await fetch(`/api/pizzas/${pizzaId}/toppings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
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
  try {
    const response = await fetch(`/api/pizzas/${pizzaId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pizza = response.json();
    return pizza;
  } catch (error) {
    console.log(error);
  }
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

const fetchOrder = async (token, orderId) => {
  try {
    const response = await fetch(`/api/orders/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
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

const fetchToppings = async (setToppings) => {
  await fetch("/api/toppings", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setToppings(result))
    .catch(console.error);
};

const fetchToppingsByCategory = async (category) => {
  try {
    const response = await fetch(`/api/toppings/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deletePizzaById = async (token, pizzaId) => {
  await fetch(`/api/pizzas/${pizzaId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });
};

export {
  addPizzaToOrder,
  addToppingToPizza,
  createOrder,
  createPizza,
  destroyPizza,
  destroyPizzaToppings,
  fetchCrusts,
  fetchPizza,
  fetchFeaturedPizzas,
  fetchOrder,
  fetchSizes,
  fetchToppings,
  fetchToppingsByCategory,
  deletePizzaById,
};
