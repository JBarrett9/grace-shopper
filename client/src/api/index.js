const BASE_URL = "https://sauceboss-rf2u.onrender.com/api"

const addPizzaToOrder = async (token, orderId, pizzaId, amount, navigate) => {
  await fetch(`${BASE_URL}/orders/${orderId}/pizzas`, {
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
  console.log(pizzaId, toppingId, amount, double);
  await fetch(`${BASE_URL}/pizzas/${pizzaId}/toppings`, {
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

const createOrder = async (token, userId) => {
  const response = await fetch(`${BASE_URL}/orders/${userId}`, {
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

const createPizza = async (
  token,
  name,
  crustId,
  userId,
  sizeId,
  featured,
  imgUrl
) => {
  console.log(name, crustId, userId, sizeId, featured, imgUrl);
  try {
    const response = await fetch(`${BASE_URL}/pizzas`, {
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
        imgUrl,
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
    await fetch(`${BASE_URL}/pizzas/${pizzaId}`, {
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
    await fetch(`${BASE_URL}/pizzas/${pizzaId}/toppings`, {
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

export async function updatePizza({
  name,
  crustId,
  userId,
  sizeId,
  featured,
  token,
  pizzaId,
  imgUrl,
}) {
  console.log("trying to update pizza:");
  const response = await fetch(`${BASE_URL}/pizzas/${pizzaId}`, {
    method: "PATCH",
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
      imgUrl,
    }),
  });
  const result = await response.json();
  return result;
}

const fetchCrusts = async (setCrusts) => {
  await fetch(`${BASE_URL}/crusts`, {
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

const fetchPizza = async (pizzaId) => {
  try {
    const response = await fetch(`${BASE_URL}/pizzas/${pizzaId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pizza = await response.json();
    return pizza;
    return pizza;
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/all`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    return users;
  } catch (error) {}
};

const fetchFeaturedPizzas = async (setPizzas) => {
  await fetch(`${BASE_URL}/pizzas/featured`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setPizzas(result))
    .catch(console.error);
};

const fetchAmountIds = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/pizza_orders`, {
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

const fetchOrder = async (token, orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/order/${orderId}`, {
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
  await fetch(`${BASE_URL}/sizes`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setSizes(result))
    .catch(console.error);
};

const fetchToppings = async (setToppings) => {
  await fetch(`${BASE_URL}/toppings`, {
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
    const response = await fetch(`${BASE_URL}/toppings/category/${category}`, {
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
  await fetch(`${BASE_URL}/pizzas/${pizzaId}`, {
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

const updateOrder = async (token, id, active) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active }),
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePizzaAmount = async (token, id, amount) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/pizza_order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePizzaById = async (token, pizzaId, fields) => {
  try {
    const response = await fetch(`${BASE_URL}/pizzas/${pizzaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });
    const pizza = response.json();
    return pizza;
  } catch (error) {
    console.log(error);
  }
};

export {
  addPizzaToOrder,
  addToppingToPizza,
  createOrder,
  createPizza,
  destroyPizza,
  destroyPizzaToppings,
  fetchAmountIds,
  fetchCrusts,
  fetchPizza,
  fetchFeaturedPizzas,
  fetchOrder,
  fetchSizes,
  fetchToppings,
  fetchToppingsByCategory,
  deletePizzaById,
  updatePizzaById,
  fetchUsers,
  updateOrder,
  updatePizzaAmount,
};
