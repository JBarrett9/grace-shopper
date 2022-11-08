import { useEffect, useState } from "react";
import { fetchFeaturedPizzas } from "../../../api";

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getAllFeaturedPizzas();
  }, []);

  const getAllFeaturedPizzas = () => {
    async function getPizzas() {
      await fetchFeaturedPizzas(setPizzas);
    }
    getPizzas();
  };

  return (
    <div>
      {pizzas.length &&
        pizzas.map((pizza) => (
          <div>
            <h3>{pizza.name}</h3>
            <p>{pizza.toppings.map((topping) => topping.name)}</p>
          </div>
        ))}
    </div>
  );
};

export default Menu;
