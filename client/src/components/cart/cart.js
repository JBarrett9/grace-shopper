import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { destroyPizza, fetchOrder } from "../../api";
import "./cart.css";

const Cart = (props) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setPrice(props.order.price / 100);
  }, []);

  const handleDestroy = async (pizzId) => {
    await destroyPizza(props.token, pizzId);
    const order = await fetchOrder(props.token, props.orderId);
    console.log(order);
    props.setOrder(order);
    setPrice(order.price / 100);
  };

  const handleEdit = async (pizzId) => {
    navigate(`/cart/${pizzId}/edit`);
  };

  return (
    <div className="cart">
      {props.order.pizzas &&
        props.order.pizzas.map((pizza) => (
          <div key={pizza.id}>
            <header className="cart-pizza-head">
              <h3>
                {props.sizes[pizza.sizeId - 1].size} {pizza.name} x{" "}
                {pizza.amount}
              </h3>
              <span>
                <a onClick={() => handleEdit(pizza.id)}>Edit</a>
                <a onClick={() => handleDestroy(pizza.id)}>Destroy</a>
              </span>
            </header>
            <div className="cart-pizza-ingredients">
              <p>{props.crusts[pizza.crustId - 1].name}</p>
              <p>{pizza.toppings.map((topping) => topping.name).join(", ")}</p>
            </div>
          </div>
        ))}
      {props.order && (
        <div>
          {props.order.price ? (
            <p style={{ textAlign: "right", marginRight: "1rem" }}>
              <strong>Total: </strong>$ {price}
            </p>
          ) : (
            <p>Cart is Empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
