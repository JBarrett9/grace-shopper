const client = require("./client");

const getLocations = async () => {
  const { rows } = await client.query(
    `SELECT *
    FROM locations
     ;`
  );

  if (!rows) {
    return null;
  }
  return rows;
};

const getUserLocations = async (userId) => {
  const { rows } = await client.query(
    `SELECT *
        FROM locations
        WHERE "userId"=$1;`,
    [userId]
  );

  if (!rows) {
    return null;
  }
  return rows;
};

const getLocationById = async (id) => {
  try {
    const {
      rows: [location],
    } = await client.query(`SELECT * FROM locations WHERE id=$1;`, [id]);

    return location;
  } catch (error) {
    throw error;
  }
};

const createLocation = async ({
  userId,
  city,
  state,
  address,
  apartment,
  main,
}) => {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
                      INSERT INTO locations ("userId", city, state, address, apartment, main )
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING *;
                  `,
      [userId, city, state, address, apartment, main]
    );

    return location;
  } catch (error) {
    throw error;
  }
};

const updateLocation = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [location],
    } = await client.query(
      `UPDATE locations SET ${setStr} WHERE id=${id} RETURNING *;`,

      Object.values(fields)
    );

    return location;
  } catch (error) {
    throw error;
  }
};

const deleteLocation = async (id) => {
  try {
    const {
      rows: [location],
    } = await client.query(`DELETE FROM locations WHERE id=$1 RETURNING *;`, [
      id,
    ]);
    return location;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserLocations,
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
