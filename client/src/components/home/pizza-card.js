import Button from "./button";

const PizzaCard = (props) => {
  return (
    <div className="pizza-card">
      <img className="pizza-card-img" src={props.img} />
      <h3>{props.pizza.name}</h3>
      <Button pizza={props.pizza}></Button>
    </div>
  );
};

export default PizzaCard;
