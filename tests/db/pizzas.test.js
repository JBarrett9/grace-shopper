const client = require("../../db/client");
const faker = require("@faker-js/faker");
const { getCrustByName, createCrust } = require("../../db/crusts");
const {
  createPizza,
  getAllFeaturedPizzas,
  getPizzaById,
  getPizzaByName,
  getAllNonFeaturedPizzas,
  getAllPizzasByUser,
  destroyPizza,
} = require("../../db/pizzas");
const { createUser, getUserByEmail } = require("../../db/users");
const { createSize } = require("../../db/sizes");

describe("DB Pizzas", () => {
  let crustId, userId, sizeId, aTestPizza;
  const name = "The Meats!!";
  const featured = true;
  const email = "testuser9@gmail.com";
  const password = "MyAwes0m3Password!";

  beforeAll(async () => {
    await createUser({
      email,
      name: "Jane Smith",
      password,
      admin: true,
    });

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
  });

  describe("getPizzaById", () => {
    it("Returns a pizza by its id", async () => {
      const pizza = await getPizzaById(aTestPizza.id);

      expect(pizza.name).toEqual(aTestPizza.name);
      expect(pizza.crustId).toEqual(aTestPizza.crustId);
      expect(pizza.userId).toEqual(aTestPizza.userId);
      expect(pizza.sizeId).toEqual(aTestPizza.sizeId);
      expect(pizza.featured).toEqual(aTestPizza.featured);
    });
  });

  describe("getPizzaByName", () => {
    it("Returns correct pizza by name", async () => {
      const pizza = await getPizzaByName(aTestPizza.name);

      expect(pizza.crustId).toEqual(aTestPizza.crustId);
      expect(pizza.userId).toEqual(aTestPizza.userId);
      expect(pizza.sizeId).toEqual(aTestPizza.sizeId);
      expect(pizza.featured).toEqual(aTestPizza.featured);
    });
  });

  describe("createPizza", () => {
    it("Adds a pizza", async () => {
      const testPizza = await createPizza({
        name,
        crustId,
        userId,
        sizeId,
        featured,
      });
      const { rows } = await client.query(`SELECT * FROM pizza;`);

      const pizza = rows.find((pizza) => pizza.name === name);

      expect(pizza.crustId).toEqual(crustId);
      expect(pizza.userId).toEqual(userId);
      expect(pizza.sizeId).toEqual(sizeId);
      expect(pizza.featured).toEqual(featured);
      await client.query(`DELETE FROM pizza WHERE id=${testPizza.id}`);
    });

    it("Returns the new pizza", async () => {
      const pizza = await createPizza({
        name,
        crustId,
        userId,
        sizeId,
        featured,
      });

      expect(pizza.id).toEqual(expect.any(Number));
      expect(pizza.name).toEqual(name);
      expect(pizza.crustId).toEqual(crustId);
      expect(pizza.userId).toEqual(userId);
      expect(pizza.sizeId).toEqual(sizeId);
      expect(pizza.featured).toEqual(featured);
    });

    it("Can create a non featured pizza/ pizza without a name", async () => {
      const pizza = await createPizza({
        crustId,
        userId,
        sizeId,
        featured: false,
      });

      expect(pizza.id).toEqual(expect.any(Number));
      expect(pizza.crustId).toEqual(crustId);
      expect(pizza.userId).toEqual(userId);
      expect(pizza.sizeId).toEqual(sizeId);
      expect(pizza.featured).toEqual(false);
    });
  });

  describe("getAllFeaturedPizzas", () => {
    it("Returns an array of all featured pizzas and excludes non-featured pizzas", async () => {
      const pizzas = await getAllFeaturedPizzas();

      const nonFeatured = pizzas.find((pizza) => pizza.featured !== true);
      const pizza = pizzas.find((pizza) => pizza.id === aTestPizza.id);

      expect(pizza.name).toEqual(aTestPizza.name);
      expect(pizzas).toEqual(expect.any(Array));
      expect(nonFeatured).toBeFalsy();
    });
  });

  describe("getAllNonFeaturedPizzas", () => {
    it("Returns an array of all non-featured pizzas and excludes featured pizzas", async () => {
      const pizzas = await getAllNonFeaturedPizzas();

      const featuredPizza = pizzas.find((pizza) => pizza.id === aTestPizza.id);

      expect(pizzas).toEqual(expect.any(Array));
      expect(featuredPizza).toBeFalsy();
    });
  });

  describe("getAllPizzasByUser", () => {
    it("Gets all pizzas for the user by email", async () => {
      const pizzas = await getAllPizzasByUser({ email });

      const pizza = pizzas.find((pizza) => pizza.id === aTestPizza.id);

      expect(pizzas).toEqual(expect.any(Array));
      expect(pizza.crustId).toEqual(aTestPizza.crustId);
      expect(pizza.userId).toEqual(userId);
    });
  });

  describe("destroyPizza", () => {
    const testParams = {
      name: "extreeeeme",
      crustId,
      userId,
      sizeId,
      featured: true,
    };

    it("Removes a pizza from table", async () => {
      const pizza = await createPizza(testParams);

      await destroyPizza(pizza.id);

      const { rows } = await client.query(`SELECT * FROM pizza;`);
      const testPizza = rows.find((pizza) => pizza.name === testParams.name);

      expect(testPizza).toBeFalsy;
    });
    it("Returns the destroyed pizza", () => {});
  });
});
