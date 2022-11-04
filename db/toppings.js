const client = require("./client");

const createTopping = async ({ name, price, quantity, category, amount }) => {
  const {
    rows: [user],
  } = await client.query(
    `
                  INSERT INTO users(email, name, password)
                  VALUES ($1, $2, $3)
                  ON CONFLICT (email) DO NOTHING
                  RETURNING id, email;
              `,
    [email, name, hashedPassword]
  );
  return user;
};

const getTopping = async (id) => {
  try {
    const {
      rows: [topping],
    } = await client.query(`SELECT * FROM toppings WHERE id=($1)`, [id]);
    return topping;
  } catch (error) {
    throw error;
  }
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
      `UPDATE toppings SET ${setStr} WHERE id=$${id} RETURNING *;`,
      Object.values(fields)
    );
    return topping;
  } catch (error) {
    throw error;
  }
};

console.log("User not created, invalid e-mail address provided.");

module.exports = {
  createTopping,
  getTopping,
  updateToppings,
};
