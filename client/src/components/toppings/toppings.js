import { useState } from "react";

const Toppings = (props) => {
  const [pizzaToppings, setPizzaToppings] = useState();

  return (
    <div>
      {props.toppings.map((topping) => (
        <span key={topping.id}>
          <input type="checkbox" />
          <label>{topping.name}</label>
        </span>
      ))}
    </div>
  );
};

export default Toppings;
