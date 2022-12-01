import PizzaCard from "./pizza-card";
import "./home.css";
import { useEffect, useState } from "react";
import { fetchFeaturedPizzas } from "../../api";
import { fetchAllReviews } from "../../api/reviews";
const Home = (props) => {
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
      {props.message && <div className="message">{props.message}</div>}
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
      <PizzaCard pizza={pizza} />
      {}
    </div>
  );
};

export default Home;
