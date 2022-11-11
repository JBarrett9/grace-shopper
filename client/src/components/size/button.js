import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(`/${props.pizza.id}/size`);
      }}
    >
      {props.text}
    </button>
  );
};

export default Button;
