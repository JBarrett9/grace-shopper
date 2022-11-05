const client = require("./client");
const { getCrustById } = require("./crusts");
const { getOrderById, updateOrderPrice } = require("./orders");
const { getPizzaById } = require("./pizzas");
const { getSizeById } = require("./sizes");

const getPrice = async (pizzaId) => {
  const pizza = await getPizzaById(pizzaId);
  const crust = await getCrustById(pizza.crustId);
  const size = await getSizeById(pizza.sizeId);

  let crustPrice = crust.price + crust.price * size.pricemod * 0.15;
  let toppingPrice = 0;

  for (let topping of pizza.toppings) {
    toppingPrice += topping.price;
  }
  if (pizza.toppings.length <= 1) {
    toppingPrice = 0;
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  let price = roundToTwo(crustPrice + toppingPrice);

  return price;
};

const getOrderPrice = async (orderId) => {
  const order = await getOrderById(orderId);
  let price = 0;
  console.log(order);
  for (let pizza of order.pizzas) {
    price += (await getPrice(pizza.id)) * pizza.amount;
  }
  console.log(price);
  await updateOrderPrice({ id: orderId, price });
  return price;
};

module.exports = {
  getPrice,
  getOrderPrice,
};
