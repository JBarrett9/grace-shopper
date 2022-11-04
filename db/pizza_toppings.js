const client = require("./client");

async function getPizzaToppingById(id) {
  const {
    rows: [pizzaTopping],
  } = await client.query(
    `SELECT *
      FROM pizza_toppings
      WHERE id=$1;`,
    [id]
  );
  return pizzaTopping;
}

async function addToppingtoPizza({ pizzaId, toppingId, amount, double }) {
  if (amount !== "left" && amount !== "right" && amount !== "full") {
    return Error(
      "Invalid amount entered. Valid values: 'left', 'right', 'full"
    );
  } else {
    const {
      rows: [topping],
    } = await client.query(
      `INSERT INTO pizza_toppings("pizzaId", "toppingId", amount, double)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [pizzaId, toppingId, amount, double]
    );
    return topping;
  }
}

async function getPizzaToppingsByPizza({ id }) {
  const { rows: toppings } = await client.query(
    `SELECT *
      FROM pizza_toppings
      WHERE "pizzaId"=$1;`,
    [id]
  );

  return toppings;
}

async function updatePizzaToppings({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    const {
      rows: [update],
    } = await client.query(
      `
      UPDATE pizza_toppings
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      Object.values(fields)
    );
    return update;
  }
}

async function removePizzaToppings(id) {
  const { rows: removed } = await client.query(
    `DELETE FROM pizza_toppings
      WHERE "pizzaId"=$1
      RETURNING *;`,
    [id]
  );

  return removed;
}

async function destroyPizzaTopping(id) {
  const {
    rows: [removed],
  } = await client.query(
    `DELETE FROM pizza_toppings;
      WHERE id=$1
      RETURNING *;`,
    [id]
  );

  return removed;
}

module.exports = {
  getPizzaToppingById,
  addToppingtoPizza,
  destroyPizzaTopping,
  updatePizzaToppings,
  getPizzaToppingById,
  getPizzaToppingsByPizza,
  removePizzaToppings,
};
