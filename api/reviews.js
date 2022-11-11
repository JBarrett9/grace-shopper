require("dotenv").config();
const express = require("express");
const {
  getAllReviews,
  createReview,
  getReviewsByUser,
  getReviewsByPizza,
} = require("../db/reviews");
const { getUserByEmail } = require("../db/users");
const { requireUser } = require("./utils");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const reviews = await getAllReviews();
  res.send(reviews);
});

router.post("/:pizzaId", requireUser, async (req, res, next) => {
  const { pizzaId } = req.params;
  const { content, stars } = req.body;

  try {
    const { id } = await getUserByEmail(req.user.email);
    const userReviews = await getReviewsByUser(id);

    for (let review of userReviews) {
      if (review.pizzaId === Number(pizzaId)) {
        next({
          error: "AlreadyReviewed",
          name: "Already Reviewed",
          message: "You have already left a review for that pizza.",
        });
      }
    }
    // const _review = await userReviews.find(
    //   (review) => review.pizzaId === pizzaId
    // );

    // if (_review)
    //   res.status(403).send({
    //     error: "User has already created a review for this pizza",
    //     message: "User has already created a review for this pizza",
    //     name: "ReviewAlreadyExistsError",
    //   });

    const review = await createReview({ pizzaId, userId: id, content, stars });
    res.send({ message: "success", data: review });
  } catch (error) {
    next(error);
  }
});

router.get("/:pizzaId", async (req, res, next) => {
  const { pizzaId } = req.params;

  try {
    const reviews = await getReviewsByPizza(pizzaId);
    res.send(reviews);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
