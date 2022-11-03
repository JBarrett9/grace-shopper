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

const getSize = async (id) => {
  try {
    const {
      rows: [size],
    } = await client.query(`SELECT * FROM crusts WHERE id=($1)`, [id]);
    return size;
  } catch (error) {
    throw error;
  }
};

const deleteSize = async (id) => {
  try {
    const {
      rows: [size],
    } = await client.query(`DELETE FROM routines WHERE id=($1) RETURNING *;`, [
      id,
    ]);
    return size;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSize,
  getSize,
  deleteSize,
};
