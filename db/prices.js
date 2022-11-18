const client = require("./client");
const { getCrustById } = require("./crusts");
const { getOrderById, updateOrderPrice, updateOrder } = require("./orders");
const { getPizzaById } = require("./pizzas");
const { getSizeById } = require("./sizes");

const getPrice = async (pizzaId) => {
  console.log("getting price");
  const pizza = await getPizzaById(pizzaId);
  if (pizza) {
    const crust = await getCrustById(pizza.crustId);
    const size = await getSizeById(pizza.sizeId);

    let crustPrice = crust.price + crust.price * size.pricemod * 0.15;

    crustPrice = Math.round(crustPrice);

    console.log(crustPrice);
    let toppingPrice = 0;

    for (let topping of pizza.toppings) {
      toppingPrice += topping.price;
    }
    if (pizza.toppings.length <= 1) {
      toppingPrice = 0;
    }

    let price = crustPrice + toppingPrice;

    return price;
  }
  return 0;
};

const getOrderPrice = async (orderId) => {
  const order = await getOrderById(orderId);
  let price = 0;
  for (let pizza of order.pizzas) {
    price += (await getPrice(pizza.id)) * pizza.amount;
  }
  await updateOrderPrice({ id: orderId, price });
  return price;
};

module.exports = {
  getPrice,
  getOrderPrice,
};
