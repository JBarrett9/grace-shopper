import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Size = () => {
  const { pizzaId } = useParams();
  const [size, setSize] = useState(2);
  const [crust, setCrust] = useState(1);

  return <form></form>;
};

export default Size;
