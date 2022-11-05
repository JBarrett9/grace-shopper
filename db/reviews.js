const client = require("./client");

const getAllReviews = async () => {
  const { rows: reviews } = await client.query(
    `SELECT *
        FROM reviews`
  );
  return reviews;
};

const createReview = async ({ pizzaId, userId, content, stars }) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews("pizzaId", "userId", content, stars)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [pizzaId, userId, content, stars]
    );

    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewsByPizza = async (id) => {
  try {
    const { rows: reviews } = await client.query(
      `SELECT * FROM REVIEWS WHERE "pizzaId"=$1`,
      [id]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
};

const updateReview = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [updatedReview],
    } = await client.query(
      `UPDATE reviews SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );
    return updatedReview;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewsByPizza,
  updateReview,
};
