const {
  createSize,
  getAllSizes,
  deleteSize,
  getSizeById,
  getSizeByName,
  updateSize,
} = require("../../db/sizes");

describe("DB Sizes", () => {
  describe("getAllSizes", () => {
    it("Returns an array of sizes", async () => {
      const testSize = { size: "extra-ordinarily large", pricemod: 2 };
      await createSize(testSize);

      const sizes = await getAllSizes();

      const size = sizes.find((size) => size.name === testSize.name);

      expect(sizes).toEqual(expect.any(Array));
      expect(size.name).toEqual(testSize.name);
      expect(size.id).toEqual(expect.any(Number));
      await deleteSize(size.id);
    });
  });

  describe("createSize", () => {
    it("Creates a size and returns a size object", async () => {
      const testSize = "extremely large";
      const { id, size } = await createSize({ size: testSize, pricemod: 5 });

      expect(testSize).toEqual(size);
      expect(id).toEqual(expect.any(Number));
      await deleteSize(id);
    });
  });

  describe("getSizeById", () => {
    it("Gets the correct size by its id", async () => {
      const testSize = await createSize({ size: "ginormous", pricemod: 3 });

      const size = await getSizeById(testSize.id);

      expect(size.size).toEqual(testSize.size);
      await deleteSize(testSize.id);
    });
  });

  describe("getSizeByName", () => {
    it("Gets a size by name", async () => {
      const param = "ginormous";
      const testSize = await createSize({ size: param, pricemod: 6 });

      const size = await getSizeByName(param);
      expect(size.size).toEqual(param);
      expect(size.id).toEqual(testSize.id);
      await deleteSize(testSize.id);
    });
  });

  describe("deleteSize", () => {
    it("Removes size from database and returns deleted size", async () => {
      const testSize = "extremely large";
      const { id, size } = await createSize({ size: testSize, pricemod: 30 });
    });
  });

  describe("updateSize", () => {
    it("Updates a size without changing the id, and returns the updated size", async () => {
      const testSize = await createSize({
        size: "so very extremely large",
        pricemod: 30,
      });
      const param = "ginormous";

      const size = await updateSize({ id: testSize.id, size: param });

      expect(size.size).toEqual(param);
      expect(size.id).toEqual(testSize.id);
    });
  });
});
