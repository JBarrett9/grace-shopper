import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPizzaToOrder,
  createOrder,
  createPizza,
  fetchCrusts,
  fetchPizza,
  fetchSizes,
} from "../../api";
import { fetchReviewsByPizzaId } from "../../api/reviews";
import pizza_img from "../../images/pizza-ga5506419a_1280.jpg";
import Button from "./button";
import "./size.css";

const Size = (props) => {
  const { pizzaId } = useParams();
  const [sizes, setSizes] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [pizza, setPizza] = useState({});
  const [crust, setCrust] = useState(1);
  const [size, setSize] = useState(2);
  const [qty, setqty] = useState(1);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getStuff();
    getReviewsByPizza()
    if (!props.orderId) {
      startOrder();
    }
    console.log(props.orderId);
  }, []);

  const getReviewsByPizza = async () =>{
    await fetchReviewsByPizzaId(pizzaId, setReviews)
  }
  
  const getStuff = async () => {
    if (pizzaId > 0) await fetchPizza(pizzaId, setPizza);
    await fetchCrusts(setCrusts);
    await fetchSizes(setSizes);
  };

  const startOrder = async () => {
    await createOrder(props.token, props.setOrderId).then(
      console.log(props.orderId)
    );
  };

  const addToOrder = async () => {
    console.log(props.user.id);
    await createPizza(props.token, crust, props.user.id, size, setPizza);
    await addPizzaToOrder(
      props.token,
      props.orderId,
      pizza.id,
      qty,
      navigate
    ).then(() => props.setNumItems(props.numItems + Number(qty)));
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
            onChange={(e) => setqty(e.target.value)}
          ></input>
        </div>
        <span className="size-form-btns">
          <Button text="Add To Order" func={addToOrder} />
          <Button text="Customize" />
        </span>
      </form>
      {console.log(reviews)}
    </div>
  );
};

export default Size;
