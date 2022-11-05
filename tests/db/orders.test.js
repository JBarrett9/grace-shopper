const client = require("../../db/client");

const { createOrder } = require("../../db/orders");
const { getUser, getUserByEmail } = require("../../db/users");

describe("DB orders", () => {
  describe("createOrder", () => {
    it("Creates an order object", async () => {
      const params = {
        userId: 42,
        active: true,
        price: 1000,
        delivery: true,
      };

      const testOrder = await createOrder(params);

      const orders = await client.query(`SELECT * FROM orders;`);

      const order = orders.find((order) => order.id === testOrder.id);

      expect(order.userId).toEqual(params.userId);
      expect(order.active).toEqual(params.active);
      expect(order.price).toEqual(params.price);
      expect(order.delivery).toEqual(params.delivery);
    });
  });
});
