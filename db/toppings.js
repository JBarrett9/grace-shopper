const client = require("./client");

async function getAllToppings() {
  const { rows } = await client.query(
    `SELECT *
    FROM toppings;`
  );
}

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
      `UPDATE toppings SET ${setStr} WHERE id=$${id} RETURNING *;`,
      Object.values(fields)
    );
    return topping;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTopping,
  attachToppingsToPizzas,
  getToppingByName,
  getToppingById,
};
