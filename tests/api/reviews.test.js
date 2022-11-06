require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { createCrust } = require("../../db/crusts");
const { createPizza } = require("../../db/pizzas");
const { createReview } = require("../../db/reviews");
const { createSize } = require("../../db/sizes");
const { createUser, getUserByEmail } = require("../../db/users");

const { objectContaining, arrayContaining } = expect;

describe("/api/reviews", () => {
  let crustId, userId, sizeId, aTestPizza, testReview, token;
  const featured = true;
  const email = "testuser9@gmail.com";
  const password = "MyAwes0m3Password!";

  beforeAll(async () => {
    const user = await createUser({
      email,
      name: "Jane Smith",
      password,
      admin: true,
    });

    token = jwt.sign(user, JWT_SECRET, { expiresIn: "5d" });

    const userAdmin = await getUserByEmail(email);

    userId = userAdmin.id;

    const crust = await createCrust({
      name: "Gluten free Cauliflower",
      price: 2,
      quantity: 42,
    });
    crustId = crust.id;

    const { id } = await createSize({ size: "Yuuuuge", pricemod: 5 });
    sizeId = id;

    const pizza = await createPizza({
      name: "Supremely Supreme",
      crustId,
      userId,
      sizeId,
      featured,
    });

    aTestPizza = pizza;

    const review = await createReview({
      pizzaId: aTestPizza.id,
      userId,
      content: "It was okay ...",
      stars: 5,
    });
    testReview = review;
  });

  describe("GET /api/reviews", () => {
    it("Returns all reviews", async () => {
      const response = await request(app).get("/api/reviews");

      expect(response.body).not.toEqual({
        message: expect.any(String),
        name: expect.any(String),
        error: expect.any(String),
      });

      expect(response.body).toEqual(
        arrayContaining([
          {
            id: testReview.id,
            pizzaId: testReview.pizzaId,
            userId: testReview.userId,
            content: testReview.content,
            stars: testReview.stars,
          },
        ])
      );
    });
  });

  describe(`POST /api/reviews/:pizzaId`, () => {
    it("Creates a new review for pizza with pizzaId and creatorId matching the users Id", async () => {
      const reviewData = {
        content: "I've had better",
        stars: 5,
      };
      const response = await request(app)
        .post(`/api/reviews/${aTestPizza.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(reviewData);

      expect(response.body).not.toEqual({
        message: expect.any(String),
        name: expect.any(String),
        error: expect.any(String),
      });

      expect(response.body.message).toEqual("success");
      expect(response.body.data.pizzaId).toEqual(aTestPizza.id);
      expect(response.body.data).toEqual(objectContaining(reviewData));
      expect(response.body.data.userId).toEqual(userId);
    });

    it("Requires a logged in user", async () => {
      const reviewData = {
        content: "The best I've ever had",
        stars: 2,
      };

      const response = await request(app)
        .post(`/reviews/${aTestPizza.id}`)
        .send(reviewData);

      expect(response.body).toEqual({
        message: expect.any(String),
        name: expect.any(String),
        error: expect.any(String),
      });
    });

    it("Does not allow a user to review the same pizza more than once", () => {});
  });
});
