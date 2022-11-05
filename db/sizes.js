const client = require("./client");

async function getAllSizes() {
  const { rows } = await client.query(
    `SELECT *
    FROM sizes;`
  );

  if (!rows) {
    return null;
  }
  return rows;
}

const createSize = async ({ size, pricemod }) => {
  try {
    const {
      rows: [row],
    } = await client.query(
      `INSERT INTO sizes (size, pricemod) VALUES ($1, $2) RETURNING *;`,
      [size, pricemod]
    );

    return row;
  } catch (error) {
    throw error;
  }
};

const getSizeById = async (id) => {
  try {
    const {
      rows: [size],
    } = await client.query(`SELECT * FROM sizes WHERE id=($1)`, [id]);
    return size;
  } catch (error) {
    throw error;
  }
};

const getSizeByName = async (name) => {
  try {
    const {
      rows: [size],
    } = await client.query(`SELECT * FROM sizes WHERE size=($1)`, [name]);
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
      rows: [updatedSize],
    } = await client.query(
      `UPDATE sizes SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );
    return updatedSize;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSize,
  getSizeById,
  deleteSize,
  updateSize,
  getAllSizes,
  getSizeByName,
};
