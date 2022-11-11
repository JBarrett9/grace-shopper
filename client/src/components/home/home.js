import PizzaCard from "./pizza-card";
import pizza_img from "../../images/pizza-ga5506419a_1280.jpg";
import "./home.css";
import { useEffect, useState } from "react";
import { fetchFeaturedPizzas } from "../../api";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    getAllFeaturedPizzas();
  }, []);

  const getAllFeaturedPizzas = async () => {
    await fetchFeaturedPizzas(setPizzas);
  };

  const pizza = { name: "Build Your Own" };
  return (
    <div className="home-container">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} img={pizza_img} pizza={pizza} />
      ))}
      <PizzaCard img={pizza_img} pizza={pizza} />
    </div>
  );
};

export default Home;
