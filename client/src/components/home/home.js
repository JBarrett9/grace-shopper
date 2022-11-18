import PizzaCard from "./pizza-card";
import pizza_img from "../../images/pizza-ga5506419a_1280.jpg";
import "./home.css";
import { useEffect, useState } from "react";
import { fetchFeaturedPizzas } from "../../api";
import { fetchAllReviews } from "../../api/reviews";
const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllFeaturedPizzas();
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    await fetchAllReviews(setReviews);
  };

  const getAllFeaturedPizzas = async () => {
    await fetchFeaturedPizzas(setPizzas);
  };

  const pizza = { id: 0, name: "Build Your Own" };
  return (
    <div className="home-container">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} img={pizza_img} pizza={pizza} />
      ))}
      <PizzaCard img={pizza_img} pizza={pizza} />
      {}
    </div>
  );
};

export default Home;
