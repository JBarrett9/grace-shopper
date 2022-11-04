require("dotenv").config();
const client = require("../../db/client");
const { createCrust } = require("../../db/crusts");

const testCrust = { name: "gluten free", price: 4000, quantity: 9000 };

describe("DB crusts", () => {
  describe("createCrust", () => {
    it("Creates a crust", async () => {
      const crust = await createCrust(testCrust);

      expect(crust.name).toEqual(test);
    });
  });
});
