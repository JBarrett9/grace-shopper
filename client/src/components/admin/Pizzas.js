import { Link } from "react-router-dom";
import "./Admin.css";
import { useEffect, useState } from "react";
import { createPizza, fetchFeaturedPizzas, deletePizzaById } from "../../api";
import AddData from "./AddData";

const Pizzas = ({ sizes, crusts, user }) => {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(null);
  const [crustId, setCrustId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [isUpDate, setIsUpDate] = useState({});

  const getAllFeaturedPizzas = async () => {
    await fetchFeaturedPizzas(setPizzas);
  };
  const getCreatePizza = async () => {
    let res = await createPizza(
      localStorage.getItem("token"),
      name,
      crustId,
      user.id,
      sizeId,
      featured
    );

    setIsUpDate(res);
    setName("");
    setFeatured("");
    setCrustId("");
    setSizeId("");
  };

  const handleDelete = async (pizzaId) => {
    await deletePizzaById(localStorage.getItem("token"), pizzaId);
    setIsUpDate({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getCreatePizza();
  };
  useEffect(() => {
    getAllFeaturedPizzas();
  }, [isUpDate]);
  return (
    <div className="Pizzas">
      <h1>Pizzas</h1>
      <AddData
        handleSubmit={handleSubmit}
        crusts={crusts}
        sizes={sizes}
        fncs={{ setCrustId, setFeatured, setName, setSizeId }}
        data={{ crustId, name, sizeId, featured }}
      />
      <table className="item-container">
        <tr className="item">
          <th>Id</th>
          <th>Name</th>
          <th>CrustId</th>
          <th>SizeId</th>
          <th>Actions</th>
        </tr>
        
        {pizzas.map((p) => {
          return (
            <tr className="item">
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.crustId}</td>
              <td>{p.sizeId}</td>
              <td>
                <button className="btn delete" onClick={() => handleDelete(p.id)}>Delete</button>
                <Link className="btn edit" to={`edit/${p.id}`}>Edit</Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default Pizzas;
