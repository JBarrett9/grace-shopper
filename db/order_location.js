const client = require("./client");

async function getLocationByOrder(id) {
  const {
    rows: [orderLocation],
  } = await client.query(
    `SELECT *
        FROM order_location
        WHERE id=$1;`,
    [id]
  );
  return orderLocation;
}

async function addLocationToOrder({ locationId, orderId }) {
  const {
    rows: [orderLocation],
  } = await client.query(
    `INSERT INTO order_location("locationId", "orderId")
        VALUES ($1, $2)
        RETURNING *;
        `,
    [locationId, orderId]
  );

  return orderLocation;
}

async function removeLocationFromOrder({ locationId, orderId }) {
  const {
    rows: [removed],
  } = await client.query(
    `DELETE FROM order_location
          WHERE "locationId"=$1 AND "orderId"=$2
          RETURNING *;
          `,
    [locationId, orderId]
  );

  return removed;
}

async function updateOrderLocation({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    const {
      rows: [update],
    } = await client.query(
      `
        UPDATE order_location
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return update;
  }
}

async function destroyOrderLocation(id) {
  const {
    rows: [removed],
  } = await client.query(
    `DELETE FROM order_location
        WHERE id=$1
        RETURNING *;`,
    [id]
  );

  return removed;
}

module.exports = {
  getLocationByOrder,
  destroyOrderLocation,
  addLocationToOrder,
  updateOrderLocation,
  removeLocationFromOrder,
};
