const client = require("./client");

const createOrder = async ({ userId, active, price, delivery }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `INSERT INTO orders ("userId", active, price, delivery)`,
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
};
