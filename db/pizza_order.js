const client = require("./client");

async function getPizzaOrderById(id) {
  const {
    rows: [pizzaOrder],
  } = await client.query(
    `SELECT *
        FROM pizza_order
        WHERE id=$1;`,
    [id]
  );
  return pizzaOrder;
}

async function addPizzaToOrder({ pizzaId, orderId, amount }) {
  if (!amount || amount <= 0) {
    return Error(
      "Invalid amount entered. Please enter an integer that's greater than 0."
    );
  } else {
    const {
      rows: [pizzaOrder],
    } = await client.query(
      `INSERT INTO pizza_order("pizzaId", "orderId", amount)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [pizzaId, orderId, amount]
    );

    return pizzaOrder;
  }
}

async function getPizzasByOrder({ id }) {
  const { rows: pizzas } = await client.query(
    `SELECT *
        FROM pizza_order
        WHERE "orderId"=$1;`,
    [id]
  );

  return pizzas;
}

async function updatePizzaOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    const {
      rows: [update],
    } = await client.query(
      `
        UPDATE pizza_order
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return update;
  }
}

async function removePizzaFromOrder(id) {
  const { rows: removed } = await client.query(
    `DELETE FROM pizza_order
        WHERE "pizzaId"=$1
        RETURNING *;`,
    [id]
  );

  return removed;
}

async function destroyPizzaOrder(id) {
  const {
    rows: [removed],
  } = await client.query(
    `DELETE FROM pizza_order;
        WHERE id=$1
        RETURNING *;`,
    [id]
  );

  return removed;
}

module.exports = {
  getPizzaOrderById,
  addPizzaToOrder,
  getPizzasByOrder,
  removePizzaFromOrder,
  destroyPizzaOrder,
  updatePizzaOrder,
};
