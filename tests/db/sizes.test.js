require("dotenv").config();
const client = require("../../db/client");
const { createSize } = require("../../db/sizes");

describe("DB Sizes", () => {
  describe("createSize", () => {
    it("Creates a size", async () => {
      const testSize = "extremely large";
      const { size } = await createSize({ size: testSize });

      expect(testSize).toEqual(size);
    });
  });
});
