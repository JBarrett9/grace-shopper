require("dotenv").config();
const client = require("../../db/client");
const { createSize } = require("../../db/sizes");

describe("DB Sizes", () => {
  describe("createSize", () => {
    it("Creates a size", () => {
      const size = "extremely large";
      const testSize = createSize({ size });

      expect(testSize).toEqual(size);
    });
  });
});
