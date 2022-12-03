import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  destroyPizza,
  fetchAmountIds,
  fetchOrder,
  fetchPizzaOrder,
  fetchUserPizzas,
  updatePizzaAmount,
  updatePizzaById,
} from "../../api";
import "./cart.css";

const Cart = (props) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [crusts, setCrusts] = useState([]);
  const [qtys, setQtys] = useState([]);
  const [amountIds, setAmountIds] = useState([]);

  useEffect(() => {
    setPrice(props.order.price / 100);

    async function getAmountIds() {
      const ids = await fetchAmountIds(props.order.id);
      setAmountIds(ids);
    }

    getAmountIds();

    if (props.order.pizzas) {
      let pizzaCrusts = [];
      let pizzaQtys = [];
      props.order.pizzas.map((pizza, idx) => {
        pizzaCrusts.push(pizza.crustId);
        pizzaQtys.push(Number(pizza.amount));
      });

      setCrusts(pizzaCrusts);
      setQtys(pizzaQtys);
    }
  }, []);

  const handleDestroy = async (pizzaId) => {
    await destroyPizza(props.token, pizzaId);
    const order = await fetchOrder(props.token, props.orderId);
    props.setOrder(order);
    setPrice(order.price / 100);
  };

  const handleEdit = async (pizzaId) => {
    navigate(`/cart/${pizzaId}/edit`);
  };

  const handleCrustChange = async (crustId, idx) => {
    let temp = crusts;
    temp[idx] = crustId;
    setCrusts(temp);
    let pizza = props.order.pizzas[idx];
    updatePizzaById(props.token, pizza.id, { crustId });
    const order = await fetchOrder(props.token, props.orderId);
    props.setOrder(order);
    setPrice(order.price / 100);
  };

  const handleQtyChange = async (amount, idx) => {
    let temp = qtys;
    temp[idx] = amount;
    setQtys(temp);
    let amountId = amountIds[idx];
    await updatePizzaAmount(props.token, amountId, amount);
    const order = await fetchOrder(props.token, props.orderId);
    setPrice(order.price / 100);
    props.setOrder(order);
  };

  return (
    <div className="cart">
      {props.order.pizzas &&
        props.order.pizzas.map((pizza, idx) => (
          <div key={pizza.id}>
            <header className="cart-pizza-head">
              <h3>
                {props.sizes[pizza.sizeId - 1].size} {pizza.name}
              </h3>
              <span>
                x{" "}
                <input
                  onChange={(e) => handleQtyChange(e.target.value, idx)}
                  value={qtys[idx]}
                  min="1"
                  type="number"
                ></input>
                <a
                  className="material-symbols-outlined"
                  onClick={() => handleDestroy(pizza.id)}
                >
                  remove
                </a>
              </span>
            </header>
            <div className="cart-pizza-ingredients">
              <select
                className="cart-crust"
                value={crusts[idx]}
                onChange={(e) => {
                  handleCrustChange(e.target.value, idx);
                }}
              >
                {props.crusts &&
                  props.crusts.map((crust) => (
                    <option key={crust.id} value={crust.id}>
                      {crust.name}
                    </option>
                  ))}
              </select>
              <p className="cart-toppings">
                {pizza.toppings.map((topping) => topping.name).join(", ")}{" "}
                <a
                  className="material-symbols-outlined"
                  onClick={() => handleEdit(pizza.id)}
                >
                  add
                </a>
              </p>
            </div>
          </div>
        ))}
      {props.order && (
        <div>
          {props.order.price ? (
            <>
              <p
                style={{
                  textAlign: "right",
                  marginRight: "1rem",
                  fontSize: "1.9rem",
                }}
              >
                <strong>Total: </strong>${price}
              </p>
              <button
                onClick={() => {
                  navigate("/location");
                }}
                className="checkout-btn"
              >
                Checkout
              </button>
            </>
          ) : (
            <p>Cart is Empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
