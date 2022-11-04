const client = require("./client");
const { attachToppingsToPizzas } = require("./toppings");
const { getUserByEmail } = require("./users");

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

const createPizza = async ({ name, crustId, userId, sizeId, featured }) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(
      `
                    INSERT INTO pizza(name, "crustId", "userId", "sizeId", featured)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *;
                `,
      [name, crustId, userId, sizeId, featured]
    );
    return pizza;
  } catch (error) {
    throw error;
  }
};

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
        SELECT * FROM pizzas
        WHERE "pizzaId"=$1;
      `,
    [user.id]
  );

  for (let pizza of pizzas) {
    const toppings = await attachToppingsToPizzas(pizza);
    pizza.toppings = toppings;
  }

  return pizzas;
}

const destroyPizza = async (id) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(`DELETE FROM pizza WHERE id=($1) RETURNING *;`, [
      id,
    ]);
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
};
