const client = require("./client");

const createSize = async ({ size }) => {
  const {
    rows: [row],
  } = await client.query(
    `
                  INSERT INTO sizes(size)
                  VALUES ($1)
                  RETURNING size;
              `,
    [size]
  );
  return row;
};

module.exports = {
  createSize,
};
