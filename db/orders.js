const client = require("./client");
const { attachPizzaToOrder } = require("./pizzas");

async function getAllOrders() {
  const { rows: orders } = await client.query(
    `SELECT *
    FROM orders`
  );

  for (let order of orders) {
    console.log(order);
    const pizzas = await attachPizzaToOrder(order);
    order.pizzas = pizzas;
  }

  return orders;
}

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
    } = await client.query(`SELECT * FROM orders WHERE id=($1)`, [id]);
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
      `UPDATE orders SET ${setStr} WHERE id=$${id} RETURNING *;`,
      Object.values(fields)
    );
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
};
