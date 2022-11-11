import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(`/${props.pizza.id}/size`);
      }}
    >
      Order Now
    </button>
  );
};

export default Button;
