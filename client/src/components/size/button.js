import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.func();
      }}
    >
      {props.text}
    </button>
  );
};

export default Button;
