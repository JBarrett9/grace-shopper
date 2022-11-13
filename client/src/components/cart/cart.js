import "./cart.css";

const Cart = (props) => {
  console.log(props.order.pizzas);
  console.log(props.sizes);

  return (
    <div className="cart">
      {props.order.pizzas &&
        props.order.pizzas.map((pizza) => (
          <div key={pizza.id}>
            <span>
              <h3>
                {props.sizes[pizza.sizeId - 1].size} {pizza.name} x{" "}
                {pizza.amount}
              </h3>
            </span>
            <p>{props.crusts[pizza.crustId - 1].name}</p>
            {pizza.toppings.map((topping) => (
              <p key={topping.id}>{topping.name}</p>
            ))}
          </div>
        ))}
      {props.order && (
        <p>
          <strong>Total: </strong>
          {props.order.price}
        </p>
      )}
    </div>
  );
};

export default Cart;
