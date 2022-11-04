const client = require("./client");

const createPizza = async ({ name, crustId, userId, sizeId, featured }) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(
      `
                    INSERT INTO pizza(name, "crustId", "userId", "sizeId", featured)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *;
                `,
      [name, crustId, userId, sizeId, featured]
    );
    console.log(pizza);
    return pizza;
  } catch (error) {
    throw error;
  }
};

const getPizzaById = async (id) => {
  try {
    const {
      rows: [pizza],
    } = await client.query(`SELECT * FROM pizza WHERE id=($1)`, [id]);
    return pizza;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// async function getAllFeaturedPizzas() {
//     const { rows: pizzas } = await client.query(
//       `SELECT *
//     FROM pizzas
//     WHERE "featured"=true;`
//     );

//     for (let pizza of pizzas) {

//       const toppings = await attachActivitiesToRoutines(routine);
//       routine.activities = activities;
//     }

//     return routines;
//   }

module.exports = {
  createPizza,
  getPizzaById,
};
