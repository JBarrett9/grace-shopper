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

const getSizeById = async (id) => {
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
    } = await client.query(`DELETE FROM sizes WHERE id=($1) RETURNING *;`, [
      id,
    ]);
    return size;
  } catch (error) {
    throw error;
  }
};

const updateSize = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [size],
    } = await client.query(
      `UPDATE sizes SET ${setStr} WHERE id=$${id} RETURNING *;`,
      Object.values(fields)
    );
    return size;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSize,
  getSizeById,
  deleteSize,
  updateSize,
};
