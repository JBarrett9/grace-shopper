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

async function attachLocationToOrder(order) {
  const { id } = order;
  if (order.delivery) {
    const {
      rows: [orders],
    } = await client.query(
      `
          SELECT *
          FROM locations
          JOIN order_location ON order_location."locationId"=locations.id
          WHERE order_location."orderId"=$1
        `,
      [id]
    );
    if (orders) {
      delete orders.userId;
      delete orders.orderId;
    }
    return orders;
  }
  return;
}

const createLocation = async ({
  userId,
  city,
  state,
  address,
  apartment,
  main,
  zipcode,
}) => {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
                      INSERT INTO locations ("userId", city, state, address, apartment, main, zipcode )
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *;
                  `,
      [userId, city, state, address, apartment, main, zipcode]
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
  attachLocationToOrder,
};
