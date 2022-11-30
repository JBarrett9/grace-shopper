import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createOrder, updateOrder } from "../../api";
import Home from "../home/home";

const Success = (props) => {
  const { orderId } = useParams();

  useEffect(() => {
    const update = async () => {
      const token = localStorage.getItem("token");
      await updateOrder(token, orderId, false);
    };

    update();
  }, []);
  return <Home message="Your order has been placed." />;
};

export default Success;
