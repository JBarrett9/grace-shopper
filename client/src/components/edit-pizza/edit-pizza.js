import Size from "../size/size";

const { useParams, useNavigate } = require("react-router-dom");
const { default: Toppings } = require("../toppings/toppings");

const EditPizza = (props) => {
  const navigate = useNavigate();

  return (
    <Toppings
      token={props.token}
      orderId={props.orderId}
      setOrder={props.setOrder}
    />
  );
};

export default EditPizza;
