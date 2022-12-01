import Button from "./button";

const PizzaCard = (props) => {
  console.log(props.pizza.imgUrl);
  return (
    <div className="pizza-card">
      <img
        className="pizza-card-img"
        src={
          props.pizza.imgUrl ||
          "https://cdn.pixabay.com/photo/2021/10/05/12/01/pizza-6682514_960_720.png"
        }
      />
      <h3>{props.pizza.name}</h3>
      <Button pizza={props.pizza}></Button>
    </div>
  );
};

export default PizzaCard;
