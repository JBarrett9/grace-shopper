const {
  getToppingById,
  createTopping,
  deleteTopping,
  updateTopping,
  getAllToppings,
  getToppingByName,
  getToppingsByCategory,
} = require("../../db/toppings");

describe("DB Pizzas", () => {
  describe("getAllToppings", () => {
    it("Returns an array of pizzas", async () => {
      const testTopping = {
        name: "kale",
        price: 32,
        quantity: 5,
        category: "vegetable",
      };

      await createTopping(testTopping);

      const toppings = await getAllToppings();

      const topping = toppings.find(
        (topping) => topping.name === testTopping.name
      );

      expect(toppings).toEqual(expect.any(Array));
      expect(topping.price).toEqual(testTopping.price);
      expect(topping.quantity).toEqual(testTopping.quantity);
      expect(topping.category).toEqual(testTopping.category);
      await deleteTopping(topping.id);
    });
  });

  describe("getToppingById", () => {
    it("Returns topping", async () => {
      const testTopping = {
        name: "beans",
        price: 32,
        quantity: 5,
        category: "vegetable",
      };
      const { id } = await createTopping(testTopping);

      const topping = await getToppingById(id);

      expect(topping.name).toEqual(testTopping.name);
      expect(topping.price).toEqual(testTopping.price);
      expect(topping.quantity).toEqual(testTopping.quantity);
      expect(topping.category).toEqual(testTopping.category);
      await deleteTopping(id);
    });
  });

  describe("getToppingByName", () => {
    it("Returns topping", async () => {
      const testTopping = {
        name: "G. Beef",
        price: 32,
        quantity: 5,
        category: "meat",
      };

      await createTopping(testTopping);

      const topping = await getToppingByName(testTopping.name);

      expect(topping.name).toEqual(testTopping.name);
      expect(topping.price).toEqual(testTopping.price);
      expect(topping.quantity).toEqual(testTopping.quantity);
      expect(topping.category).toEqual(testTopping.category);
      await deleteTopping(topping.id);
    });
  });

  describe("getToppingsByCategory", () => {
    it("Returns an array of toppings by category", async () => {
      const testTopping = {
        name: "Rabbit",
        price: 32,
        quantity: 5,
        category: "meat",
      };

      await createTopping(testTopping);

      const toppings = await getToppingsByCategory(testTopping.category);

      const topping = toppings.find(
        (topping) => topping.name === testTopping.name
      );

      expect(toppings).toEqual(expect.any(Array));
      expect(topping.price).toEqual(testTopping.price);
      expect(topping.quantity).toEqual(testTopping.quantity);
      expect(topping.category).toEqual(testTopping.category);
      await deleteTopping(topping.id);
    });
  });

  describe("updateTopping", () => {
    it("Updates topping without changing id", async () => {
      const { id } = await createTopping({
        name: "kale",
        price: 32,
        quantity: 5,
        category: "vegetable",
      });

      const name = "collard greens";
      const quantity = 42;

      const topping = await updateTopping({ id, name, quantity });
      const testTopping = await getToppingById(id);

      expect(topping.id).toEqual(id);
      expect(testTopping.name).toEqual(name);
      expect(testTopping.price).toEqual(32);
      expect(testTopping.quantity).toEqual(quantity);
      expect(testTopping.category).toEqual("vegetable");
      await deleteTopping(id);
    });

    it("Returns updated topping", async () => {
      const testTopping = {
        name: "kale",
        price: 32,
        quantity: 5,
        category: "vegetable",
      };

      const { id } = await createTopping(testTopping);

      const name = "collard greens";
      const quantity = 42;

      const topping = await updateTopping({ id, name, quantity });

      expect(topping.id).toEqual(id);
      expect(topping.name).toEqual(name);
      expect(topping.price).toEqual(testTopping.price);
      expect(topping.quantity).toEqual(quantity);
      expect(topping.category).toEqual(testTopping.category);
      await deleteTopping(id);
    });
  });
});
