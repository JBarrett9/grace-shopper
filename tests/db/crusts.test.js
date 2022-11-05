const {
  createCrust,
  getCrustById,
  deleteCrust,
  updateCrust,
} = require("../../db/crusts");

describe("DB Crusts", () => {
  describe("createCrust", () => {
    it("Creates a crust", async () => {
      const testCrust = { name: "gluten free", price: 4000, quantity: 9000 };
      const crust = await createCrust(testCrust);

      expect(crust.name).toEqual(testCrust.name);
      expect(crust.price).toEqual(testCrust.price);
      expect(crust.quantity).toEqual(testCrust.quantity);
    });
  });

  describe("getCrustById", () => {
    it("Gets crust object by id", async () => {
      const testCrust = await createCrust({
        name: "bacon and cheese stuffed",
        price: 200,
        quantity: 9001,
      });

      const crust = await getCrustById(testCrust.id);

      expect(crust.name).toEqual(testCrust.name);
      expect(crust.price).toEqual(testCrust.price);
      expect(crust.quantity).toEqual(testCrust.quantity);
    });
  });

  describe("deleteCrust", () => {
    it("Deletes a crust", async () => {
      const testCrust = await createCrust({
        name: "anchovies",
        price: 200,
        quantity: 1,
      });
      await deleteCrust(testCrust.id);

      const crust = getCrustById(testCrust.id);

      expect(crust.id).toEqual(undefined);
    });

    it("Returns deleted crust object", async () => {
      const testCrust = await createCrust({
        name: "anchovies",
        price: 200,
        quantity: 1,
      });
      const crust = await deleteCrust(testCrust.id);

      expect(crust.name).toEqual(testCrust.name);
      expect(crust.price).toEqual(testCrust.price);
      expect(crust.quantity).toEqual(testCrust.quantity);
    });
  });

  describe("updateCrust", () => {
    it("Updates fields without changing the ID", async () => {
      const { id } = await createCrust({
        name: "anchovies",
        price: 200,
        quantity: 1,
      });

      const name = "quadruple stuffed";

      await updateCrust({ id, name });

      const crust = await getCrustById(id);

      expect(crust.name).toEqual(name);
    });

    it("Returns the updated crust", async () => {
      const testCrust = await createCrust({
        name: "Jalapeno cheese stuffed",
        price: 200,
        quantity: 1000,
      });

      const name = "Jalapeno bacon stuffed";

      const params = { id: testCrust.id, name };

      const crust = await updateCrust(params);

      expect(crust.name).toEqual(name);
      expect(crust.price).toEqual(testCrust.price);
      expect(crust.quantity).toEqual(testCrust.quantity);
    });
  });
});
