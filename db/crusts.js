const client = require("./client");

const createCrust = async ({ name, price, quantity }) => {
  const {
    rows: [crust],
  } = await client.query(
    `
                  INSERT INTO crusts(name, price, quantity)
                  VALUES ($1, $2, $3)
                  ON CONFLICT (name) DO NOTHING
                  RETURNING *;
              `,
    [name, price, quantity]
  );
  return crust;
};

module.exports = {
  createCrust,
};
