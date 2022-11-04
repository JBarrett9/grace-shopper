const client = require("./client");

async function getAllCrusts() {
  const { rows } = await client.query(
    `SELECT *
    FROM crusts;`
  );

  if (!rows) {
    return null;
  }
  return rows;
}

const createCrust = async ({ name, price, quantity }) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const getCrustById = async (id) => {
  try {
    const {
      rows: [crust],
    } = await client.query(`SELECT * FROM crusts WHERE id=($1)`, [id]);
    return crust;
  } catch (error) {
    throw error;
  }
};

const deleteCrust = async (id) => {
  try {
    const {
      rows: [crust],
    } = await client.query(`DELETE FROM crusts WHERE id=($1) RETURNING *`, [
      id,
    ]);
    return crust;
  } catch (error) {
    throw error;
  }
};

const updateCrust = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [crust],
    } = await client.query(
      `UPDATE crusts SET ${setStr} WHERE id=$${id} RETURNING *;`,
      Object.values(fields)
    );
    return crust;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCrust,
  getCrustById,
  deleteCrust,
  updateCrust,
  getAllCrusts,
};
