const client = require("./client");
const { getPizzaById } = require("./pizzas");

async function getAllToppings() {
  const { rows } = await client.query(
    `SELECT *
    FROM toppings;`
  );

  if (!rows) {
    return null;
  }
  return rows;
}

const getToppingById = async (id) => {
  try {
    const {
      rows: [topping],
    } = await client.query(`SELECT * FROM toppings WHERE id=($1)`, [id]);
    return topping;
  } catch (error) {
    throw error;
  }
};

async function getToppingByName(name) {
  const {
    rows: [topping],
  } = await client.query(
    `
  SELECT * FROM toppings
  WHERE name=$1
    `,
    [name]
  );
  return topping;
}

async function getToppingsByCategory(category) {
  const { rows: toppings } = await client.query(
    `
  SELECT * FROM toppings
  WHERE category=$1
    `,
    [category]
  );

  return toppings;
}

async function attachToppingsToPizzas(pizzas) {
  const { id } = pizzas;

  const { rows: toppings } = await client.query(
    `
    SELECT *
    FROM toppings
    JOIN pizza_toppings ON pizza_toppings."toppingId"=toppings.id
    WHERE pizza_toppings."pizzaId"=$1
  `,
    [id]
  );
  for (let topping of toppings) {
    delete topping.pizzaId;
    delete topping.toppingId;
  }
  return toppings;
}

const createTopping = async ({ name, price, quantity, category }) => {
  const {
    rows: [topping],
  } = await client.query(
    `
                  INSERT INTO toppings(name, price, quantity, category)
                  VALUES ($1, $2, $3, $4)
                  RETURNING *;
              `,
    [name, price, quantity, category]
  );
  return topping;
};

const updateToppings = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [topping],
    } = await client.query(
      `UPDATE toppings SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return topping;
  } catch (error) {
    throw error;
  }
};

const deleteTopping = async (id) => {
  try {
    const {
      rows: [topping],
    } = await client.query(`DELETE FROM toppings WHERE id=($1) RETURNING *;`, [
      id,
    ]);
    return topping;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTopping,
  getAllToppings,
  getToppingById,
  getToppingByName,
  attachToppingsToPizzas,
  updateToppings,
  getToppingsByCategory,
  deleteTopping,
};
