const client = require("./client");
const { createCrust, getCrustById } = require("./crusts");
const {
  createLocation,
  getLocations,
  getUserLocations,
  updateLocation,
  deleteLocation,
} = require("./locations");
const { createOrder, getAllOrders } = require("./orders");
const {
  addLocationToOrder,
  removeLocationFromOrder,
} = require("./order_location");
const { createPizza, getAllFeaturedPizzas } = require("./pizzas");
const { addPizzaToOrder } = require("./pizza_order");
const { addToppingToPizza } = require("./pizza_toppings");
const { getPrice, getOrderPrice } = require("./prices");
const {
  createReview,
  getAllReviews,
  getReviewsByPizza,
  updateReview,
} = require("./reviews");
const { createSize } = require("./sizes");
const { createTopping } = require("./toppings");
const { createUser, getUserByEmail } = require("./users");

const dropTables = async () => {
  try {
    console.log("=== DROPPING TABLES === ");
    await client.query(`
    DROP TABLE IF EXISTS order_location;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS pizza_order;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS pizza_toppings;
    DROP TABLE IF EXISTS pizza;
    DROP TABLE IF EXISTS sizes;
    DROP TABLE IF EXISTS crusts;
    DROP TABLE IF EXISTS toppings;
    DROP TABLE IF EXISTS locations;
    DROP TABLE IF EXISTS users;
    `);
    console.log("=== TABLES DROPPED === ");
  } catch (error) {
    console.log("Error dropping tables!");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("=== CREATING TABLES === ");

    console.log("Creating users table...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT true,
      admin BOOLEAN DEFAULT false,
      birthday DATE
    );`);

    console.log("Creating locations table...");
    await client.query(`
    CREATE TABLE locations(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      apartment BOOLEAN DEFAULT false,
      main BOOLEAN DEFAULT false,
      zipcode INTEGER NOT NULL
    );`);

    console.log("Creating toppings table...");
    await client.query(`
    CREATE TABLE toppings(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price FLOAT NOT NULL,
      quantity INTEGER,
      category VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT true
    );`);

    console.log("Creating crusts table...");
    await client.query(`
    CREATE TABLE crusts(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price FLOAT NOT NULL,
      quantity INTEGER,
      active BOOLEAN DEFAULT true
    );`);

    console.log("Creating sizes table...");
    await client.query(`
      CREATE TABLE sizes(
        id SERIAL PRIMARY KEY,
        size VARCHAR(255) UNIQUE NOT NULL,
        pricemod FLOAT NOT NULL
      );
    `);

    console.log("Creating pizza table...");
    await client.query(`
      CREATE TABLE pizza(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        "crustId" INTEGER REFERENCES crusts(id) NOT NULL,
        "userId" INTEGER REFERENCES users(id),
        "sizeId" INTEGER REFERENCES sizes(id),
        featured BOOLEAN DEFAULT false
      );
    `);

    console.log("Creating pizza_toppings table...");
    await client.query(`
      CREATE TABLE pizza_toppings(
        id SERIAL PRIMARY KEY,
        "pizzaId" INTEGER REFERENCES pizza(id) NOT NULL,
        "toppingId" INTEGER REFERENCES toppings(id) NOT NULL,
        amount VARCHAR(255) NOT NULL,
        double BOOLEAN DEFAULT false
      );
    `);

    console.log("Creating orders table...");
    await client.query(`
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        active BOOLEAN DEFAULT true,
        price DECIMAL,
        delivery BOOLEAN DEFAULT false
      );
    `);

    console.log("Creating pizza_order table...");
    await client.query(`
      CREATE TABLE pizza_order(
        id SERIAL PRIMARY KEY,
        "pizzaId" INTEGER REFERENCES pizza(id) NOT NULL,
        "orderId" INTEGER REFERENCES orders(id) NOT NULL,
        amount INTEGER NOT NULL
      );
    `);

    console.log("Creating reviews table...");
    await client.query(`
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "pizzaId" INTEGER REFERENCES pizza(id) NOT NULL,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        content VARCHAR(255),
        stars INTEGER NOT NULL
      );
    `);

    console.log("Creating order_location table...");
    await client.query(`
    CREATE TABLE order_location(

      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id) NOT NULL,
      "locationId" INTEGER REFERENCES locations(id) NOT NULL
    );
    `);

    console.log("=== TABLES CREATED === ");
  } catch (error) {
    console.log("Error creating tables...");
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log("Creating initial users...");
  try {
    await createUser({
      name: "james01",
      password: "james01",
      email: "generalzhenwu@gmail.com",
      admin: true,
    });
    await createUser({
      name: "joseph01",
      password: "joseph01",
      email: "belicjel@gmail.com",
      admin: true,
    });
    await createUser({
      name: "brian01",
      password: "brian01",
      email: "jimmys14205@gmail.com",
      admin: false,
    });

    await createUser({
      name: "mike01",
      password: "mike01",
      email: "belicmichael@gmail.com",
      admin: true,
    });
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
};

const createInitialToppings = async () => {
  console.log("Creating initial toppings...");
  try {
    await createTopping({
      name: "Sausage",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Pepperoni",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });
    await createTopping({
      name: "Salami",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });
    await createTopping({
      name: "Bacon",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Grilled Chicken",
      price: 1,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Canadian Ham",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Meatballs",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Extra Cheese",
      price: 0.5,
      quantity: "1000",
      category: "cheese",
    });

    await createTopping({
      name: "Cheese",
      price: 0.5,
      quantity: "1000",
      category: "cheese",
    });

    await createTopping({
      name: "Light Cheese",
      price: 0.5,
      quantity: "1000",
      category: "cheese",
    });

    await createTopping({
      name: "No Cheese",
      price: 0.5,
      quantity: "1000",
      category: "meat",
    });

    await createTopping({
      name: "Parmesan",
      price: 0.5,
      quantity: "1000",
      category: "cheese",
    });

    await createTopping({
      name: "3-Cheese Blend",
      price: 0.5,
      quantity: "1000",
      category: "cheese",
    });

    await createTopping({
      name: "Black Olives",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Banana Peppers",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Green Peppers",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Fresh Spinach",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Jalapeño Peppers",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Pineapple",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Mushrooms",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });

    await createTopping({
      name: "Onions",
      price: 0.5,
      quantity: "1000",
      category: "vegetable",
    });
  } catch (error) {
    console.log("Error creating toppings!");
    throw error;
  }
};

const createInitialCrusts = async () => {
  console.log("Creating initial crusts...");
  try {
    createCrust({
      name: "Original Crust",
      price: "11.99",
      quantity: "1000",
    });
    createCrust({
      name: "Pepperoni-Stuffed Crust",
      price: "13.99",
      quantity: "500",
    });
    createCrust({
      name: "Thin Crust",
      price: "11.99",
      quantity: "700",
    });
    createCrust({
      name: "Gluten-Free Crust",
      price: "12.99",
      quantity: "200",
    });
    createCrust({
      name: "NY Style Crust",
      price: "12.99",
      quantity: "300",
    });
  } catch (error) {
    console.log("Error creating crusts!");
    throw error;
  }
};

const createInitialSizes = async () => {
  try {
    console.log("Creating initial sizes...");
    await createSize({ size: "small", pricemod: 1 });
    await createSize({ size: "medium", pricemod: 2 });
    await createSize({ size: "large", pricemod: 3 });
    await createSize({ size: "extra large", pricemod: 4 });
  } catch (error) {
    console.log("Error creating sizes!");
    throw error;
  }
};

const createInitialPizzas = async () => {
  try {
    console.log("Creating initial pizzas...");

    await createPizza({
      name: "Pepperoni Pizza",
      crustId: 1,
      userId: 1,
      sizeId: 3,
      featured: true,
    });

    await createPizza({
      name: "Sasuage Pizza",
      crustId: 1,
      userId: 1,
      sizeId: 3,
      featured: true,
    });
  } catch (error) {
    console.log("Error creating pizzas!");
    throw error;
  }
};

const createInitialPizzaToppings = async () => {
  console.log("Creating initial attachment of pizza toppings...");
  try {
    await addToppingToPizza({
      pizzaId: 1,
      toppingId: 2,
      amount: "full",
      double: false,
    });
    await addToppingToPizza({
      pizzaId: 1,
      toppingId: 3,
      amount: "left",
      double: false,
    });

    // const pizzas = await getAllFeaturedPizzas();
    // console.log(pizzas);
  } catch (error) {
    console.log("Error attaching toppings to pizzas!");
    throw error;
  }
};

const createInitialOrders = async () => {
  console.log("Creating initial orders...");
  try {
    await createOrder({ userId: 1, active: true, price: 0, delivery: true });
    await createOrder({ delivery: true });
    await createOrder({});
  } catch (error) {
    console.log("Error creating orders!");
    throw error;
  }
};

const createIntitialPizzaOrders = async () => {
  console.log("Creating initial pizza_orders...");
  try {
    await addPizzaToOrder({ pizzaId: 1, orderId: 1, amount: 2 });
    await addPizzaToOrder({ pizzaId: 2, orderId: 1, amount: 4 });
    const orders = await getAllOrders();
    for (let order of orders) {
      order.price = await getOrderPrice(order.id);
    }

    console.log("ORDERS: ", orders);
    console.log("ORDERS[0]: ", orders[0]);
    console.log("ORDERS[0].PIZZAS[0]: ", orders[0].pizzas[0]);
  } catch (error) {
    console.log("Error creating initial pizza_orders!");
    throw error;
  }
};

const createInitialReviews = async () => {
  console.log("Creating initial reviews...");
  try {
    await createReview({
      pizzaId: 1,
      userId: 1,
      content: "This a good pizza, man.",
      stars: 4,
    });
    await createReview({
      pizzaId: 2,
      userId: 1,
      content: "This a bad pizza, man.",
      stars: 2,
    });

    await updateReview({
      id: 1,
      stars: 5,
    });

    // const reviews = await getAllReviews();
    // console.log(reviews);
  } catch (error) {
    console.log("Error creating initial reviews!");
    throw error;
  }
};

const createInitialLocations = async () => {
  console.log("Creating initial locations...");
  try {
    await createLocation({
      userId: 1,
      city: "Richmond",
      state: "Virginia",
      address: "123 Main St.",
      apartment: false,
      main: true,
      zipcode: 11231,
    });
    await createLocation({
      userId: 1,
      city: "Pittsburgh",
      state: "Pennslyvania",
      address: "434 Broad St.",
      apartment: false,
      main: false,
      zipcode: 11231,
    });

    await updateLocation({ id: 1, apartment: true });

    // const locations = await getLocations();
    // console.log(locations);
  } catch (error) {
    throw error;
  }
};
const createInitialOrderLocations = async () => {
  console.log("Creating initial order locations...");
  try {
    await addLocationToOrder({ orderId: 1, locationId: 1 });
    await removeLocationFromOrder({ orderId: 1, locationId: 1 });
    await addLocationToOrder({ orderId: 1, locationId: 2 });

    const orders = await getAllOrders();

    console.log(orders[0]);
    // const locations = await getLocations();
    // console.log(locations);
  } catch (error) {
    throw error;
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();

    console.log("=== CREATING DATA === ");
    await createInitialUsers();
    await createInitialToppings();
    await createInitialCrusts();
    await createInitialSizes();
    await createInitialPizzas();
    await createInitialPizzaToppings();
    await createInitialOrders();
    await createIntitialPizzaOrders();
    await createInitialReviews();
    await createInitialLocations();
    await createInitialOrderLocations();
    console.log("=== DATA CREATED === ");
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
