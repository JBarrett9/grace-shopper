const client = require("./client");
const { attachPizzaToOrder } = require("./pizzas");

async function getAllOrders() {
  const { rows: orders } = await client.query(
    `SELECT *
    FROM orders`
  );

  for (let order of orders) {
    const pizzas = await attachPizzaToOrder(order);
    order.pizzas = pizzas;
  }

  return orders;
}

const getUserOrders = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `SELECT *
      FROM orders
      WHERE "userId" = ($1)`,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

const createOrder = async ({ userId, active, price, delivery }) => {
  if (delivery === undefined) {
    delivery = false;
  }
  if (active === undefined) {
    active = true;
  }
  try {
    const {
      rows: [order],
    } = await client.query(
      `INSERT INTO orders ("userId", active, price, delivery)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [userId, active, price, delivery]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(`SELECT * FROM orders WHERE id=($1);`, [id]);

    const pizzas = await attachPizzaToOrder(order);
    order.pizzas = pizzas;

    return order;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [order],
    } = await client.query(
      `UPDATE orders SET ${setStr} WHERE id=${id} RETURNING *;`,

      Object.values(fields)
    );

    return order;
  } catch (error) {
    throw error;
  }
};

const updateOrderPrice = async ({ id, price }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `UPDATE orders SET price=$1 WHERE id=${id} RETURNING *;`,
      [price]
    );

    return order;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(`DELETE FROM orders WHERE id=($1) RETURNING *`, [
      id,
    ]);
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getAllOrders,
  deleteOrder,
  getUserOrders,
  updateOrderPrice,
};
