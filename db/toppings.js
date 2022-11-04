const client = require("./client");

const createTopping = async ({ name, price, quantity, category }) => {
  if (
    category !== "meat" &&
    category !== "cheese" &&
    category !== "vegetable"
  ) {
    console.log(
      "Invalid category, please choose from 'meat', 'cheese' or 'vegetable'."
    );
  } else {
    const {
      rows: [user],
    } = await client.query(
      `
                  INSERT INTO toppings(name, price, quantity, category)
                  VALUES ($1, $2, $3, $4)
                  ON CONFLICT (name) DO NOTHING
                  RETURNING *;
              `,
      [name, price, quantity, category]
    );
    return user;
  }
};

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

module.exports = {
  createTopping,
  getToppingById,
};
