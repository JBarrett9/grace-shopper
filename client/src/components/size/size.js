import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPizzaToOrder,
  addToppingToPizza,
  createOrder,
  createPizza,
  fetchCrusts,
  fetchOrder,
  fetchPizza,
  fetchSizes,
} from "../../api";
import { fetchReviewsByPizzaId } from "../../api/reviews";
import pizza_img from "../../images/pizza-ga5506419a_1280.jpg";
import Button from "./button";
import "./size.css";

const Size = (props) => {
  const { crusts, sizes } = props;
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});
  const [crust, setCrust] = useState(1);
  const [size, setSize] = useState(2);
  const [qty, setqty] = useState(1);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPizza = async () => {
      const pizza = await fetchPizza(pizzaId);
      setPizza(pizza);
    };
    if (pizzaId > 0) getPizza();
    getReviewsByPizza();
    if (!props.orderId) {
      startOrder();
    }
  }, []);

  const getReviewsByPizza = async () => {
    await fetchReviewsByPizzaId(pizzaId, setReviews);
  };

  const startOrder = async () => {
    console.log(props.user.id);
    await createOrder(props.token, props.user.id, props.setOrderId).then(
      console.log(props.orderId)
    );
  };

  const addToOrder = async () => {
    let name = "custom";
    if (pizza.name) name = pizza.name;

    const newPizza = await createPizza(
      props.token,
      name,
      crust,
      props.user.id,
      size
    );

    if (pizza.toppings) {
      for (let topping of pizza.toppings) {
        await addToppingToPizza(
          props.token,
          newPizza.id,
          topping.id,
          "full",
          false
        );
      }
    }

    await addPizzaToOrder(
      props.token,
      props.orderId,
      newPizza.id,
      qty,
      navigate
    );

    const order = await fetchOrder(props.token, props.orderId);
    props.setOrder(order);
  };

  const customize = async () => {
    console.log("customize running");
    let name = "custom";
    if (pizza.name) name = pizza.name;

    const newPizza = await createPizza(
      props.token,
      name,
      crust,
      props.user.id,
      size
    );

    if (pizza.toppings) {
      for (let topping of pizza.toppings) {
        await addToppingToPizza(
          props.token,
          newPizza.id,
          topping.id,
          "full",
          false
        );
      }
    }

    await addPizzaToOrder(
      props.token,
      props.orderId,
      newPizza.id,
      qty,
      navigate
    );

    const order = await fetchOrder(props.token, props.orderId);
    props.setOrder(order);

    navigate(`/${newPizza.id}/toppings`);
  };

  return (
    <div className="size-card">
      <img src={pizza_img} className="size-card-img" />
      <form className="size-form">
        <h2>{pizza.name}</h2>
        <div className="size-form-input-sec">
          <label>Crust:</label>
          <select
            value={crust}
            onChange={(e) => {
              setCrust(e.target.value);
            }}
          >
            {crusts &&
              crusts.map((crust) => (
                <option key={crust.id} value={crust.id}>
                  {crust.name}
                </option>
              ))}
          </select>
        </div>
        <div className="size-form-input-sec">
          <label>Size:</label>
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {sizes &&
              sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
          </select>
          <label>Qty:</label>
          <input
            type="number"
            value={qty}
            min={0}
            onChange={(e) => setqty(e.target.value)}
          ></input>
        </div>
        <span className="size-form-btns">
          {pizzaId > 0 ? (
            <>
              <Button text="Add To Order" func={addToOrder} />
              <Button text="Customize" func={customize} />
            </>
          ) : (
            <Button text="Toppings" func={customize} />
          )}
        </span>
      </form>
      {console.log(reviews)}
    </div>
  );
};

export default Size;
