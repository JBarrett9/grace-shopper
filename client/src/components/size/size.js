import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createOrder, fetchCrusts, fetchPizza, fetchSizes } from "../../api";
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

  useEffect(() => {
    getStuff();
    if (!props.orderId) {
      startOrder();
    }
    console.log(props.orderId);
  }, []);

  const getStuff = async () => {
    await fetchPizza(pizzaId, setPizza);
    await fetchCrusts(setCrusts);
    await fetchSizes(setSizes);
  };

  const startOrder = async () => {
    await createOrder(props.token, props.setOrderId).then(
      console.log(props.orderId)
    );
  };

  const addToOrder = async () => {};

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
          <input type="number" value={qty}></input>
        </div>
        <span className="size-form-btns">
          <Button text="Add To Order" func={addToOrder} />
          <Button text="Customize" />
        </span>
      </form>
    </div>
  );
};

export default Size;
