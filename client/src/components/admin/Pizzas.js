import { Routes } from "react-router-dom";
import "./Admin.css";
import { useEffect, useState } from "react";
import { createPizza, fetchFeaturedPizzas, deletePizzaById } from "../../api";
import AddData from "./AddData";

const Pizzas = ({ sizes, crusts }) => {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(null);
  const [crustId, setCrustId] = useState(null);
  const [sizeId, setSizeId] = useState(null);

  const getAllFeaturedPizzas = async () => {
    await fetchFeaturedPizzas(setPizzas);
  };
  const getCreatePizza = async () => {
    let res = await createPizza(
      localStorage.getItem("token"),
      name,
      crustId,
      1,
      sizeId
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, crustId, sizeId, featured);
    getCreatePizza();
  };
  useEffect(() => {
    getAllFeaturedPizzas();
  }, []);
  return (
    <div className="Pizzas">
      <h1>Pizzas</h1>
      <AddData
        handleSubmit={handleSubmit}
        crusts={crusts}
        sizes={sizes}
        fncs={{ setCrustId, setFeatured, setName, setSizeId }}
      />
      <table className="item-container admin-table">
        <tr className="item">
          <th>Id</th>
          <th>Name</th>
          <th>CrustId</th>
          <th>SizeId</th>
          <th>Actions</th>
        </tr>
        <tr className="item">
          <td>1</td>
          <td>Cheese Pizza</td>
          <td>3</td>
          <td>4</td>
          <td>
            <button>Delete</button>
            <button>Edit</button>
          </td>
        </tr>
        {pizzas.map((p) => {
          return (
            <tr className="item">
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.crustId}</td>
              <td>{p.sizeId}</td>
              <td>
                <button>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default Pizzas;
