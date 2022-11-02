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
console.log("User not created, invalid e-mail address provided.");

module.exports = {
  createTopping,
};
