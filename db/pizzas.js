const client = require("./client");
const { attachToppingsToPizzas } = require("./toppings");
const { getUserByEmail } = require("./users");

async function getAllFeaturedPizzas() {
  const { rows: pizzas } = await client.query(
    `SELECT *
    FROM pizza
    WHERE "featured"=true;`
  );

  for (let pizza of pizzas) {
    const toppings = await attachToppingsToPizzas(pizza);
    pizza.toppings = toppings;
  }

  return pizzas;
}

async function getAllNonFeaturedPizzas() {
  const { rows: pizzas } = await client.query(
    `SELECT *
    FROM pizza
    WHERE "featured"=false;`
  );

  for (let pizza of pizzas) {
    const toppings = await attachToppingsToPizzas(pizza);
    pizza.toppings = toppings;
  }

  return pizzas;
}

async function getAllPizzasByUser({ email }) {
  const user = await getUserByEmail(email);

  const { rows: pizzas } = await client.query(
    `
        SELECT * FROM pizza
        WHERE "userId"=$1;
      `,
    [user.id]
  );

  for (let pizza of pizzas) {
    const toppings = await attachToppingsToPizzas(pizza);
    pizza.toppings = toppings;
  }

  return pizzas;
}

const getPizzaById = async (id) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(`SELECT * FROM pizza WHERE id=($1)`, [id]);

    if (pizza) {
      const toppings = await attachToppingsToPizzas(pizza);
      pizza.toppings = toppings;
    }

    return pizza;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPizzaByName = async (name) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(`SELECT * FROM pizza WHERE name=($1)`, [name]);

    if (pizza) {
      const toppings = await attachToppingsToPizzas(pizza);
      pizza.toppings = toppings;
    }

    return pizza;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function attachPizzaToOrder(order) {
  const { id } = order;

  const { rows: orders } = await client.query(
    `
    SELECT *
    FROM pizza
    JOIN pizza_order ON pizza_order."pizzaId"=pizza.id
    WHERE pizza_order."orderId"=$1
  `,
    [id]
  );
  for (let order of orders) {
    const toppings = await attachToppingsToPizzas({ id: order.pizzaId });
    order.toppings = toppings;
    delete order.pizzaId;
    delete order.orderId;
  }
  return orders;
}

const createPizza = async ({
  name,
  crustId,
  userId,
  sizeId,
  featured,
  imgUrl,
}) => {
  console.log("creating pizza");
  try {
    const {
      rows: [pizza],
    } = await client.query(
      `
                    INSERT INTO pizza(name, "crustId", "userId", "sizeId", featured, "imgUrl")
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *;
                `,
      [name, crustId, userId, sizeId, featured, imgUrl]
    );
    return pizza;
  } catch (error) {
    throw error;
  }
};

const destroyPizza = async (id) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(`DELETE FROM pizza WHERE id=$1 RETURNING *;`, [id]);
    return pizza;
  } catch (error) {
    throw error;
  }
};

const updatePizza = async ({ id, ...fields }) => {
  console.log("Updating pizza...", id);
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [pizza],
    } = await client.query(
      `UPDATE pizza SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );
    console.log(pizza);
    return pizza;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPizza,
  getPizzaById,
  getAllFeaturedPizzas,
  getAllPizzasByUser,
  destroyPizza,
  updatePizza,
  getPizzaByName,
  getAllNonFeaturedPizzas,
  attachPizzaToOrder,
};
