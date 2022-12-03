import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTopping, fetchToppingbyId } from "../../../api/toppings";

const EditTopping = ({ setIsUpDate }) => {
  const [topping, setTopping] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmitEditTopping = async (e) => {
    e.preventDefault();
    await editTopping(localStorage.getItem("token"), id, {
      name,
      price,
      quantity,
      category,
    });
    setIsUpDate({});
    navigate("/admin/pizzas/toppings");
  };

  const getToppingById = async () => {
    await fetchToppingbyId(id, setTopping);
  };

  useEffect(() => {
    setName(topping.name);
    setCategory(topping.category);
    setPrice(topping.price);
    setQuantity(topping.quantity);
    setActive(topping.active);
  }, [topping]);

  useEffect(() => {
    getToppingById();
  }, []);

  return (
    <div className="admin-container">
      {console.log(topping)}

      <form onSubmit={handleSubmitEditTopping} className="admin-form">
        <div className="form-data">
          <label>Topping name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="topping-name"
            name={"name"}
            value={name}
          />
        </div>
        <div className="form-data">
          <label>Price:</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            id="topping-price"
            name={"price"}
            value={price}
          />
        </div>
        <div className="form-data">
          <label>Quantity:</label>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="num"
            id="topping-quantity"
            name={"quantity"}
            value={quantity}
          />
        </div>

        <div className="form-data">
          <label>Category:</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="sizeId"
            value={category}
          >
            <option value="">Select Category</option>
            <option value="meat">meat</option>
            <option value="cheese">Cheese</option>
            <option value="vegetable">Vegetable</option>
            <option value="sauce">meat</option>
          </select>
        </div>

        <div className="form-data">
          <label>Active:</label>
          <div>
            <input
              onChange={(e) => setActive(e.target.value)}
              value={true}
              type="radio"
              id="active"
              name="active"
            />
            <span>true</span>
            <input
              onChange={(e) => setActive(e.target.value)}
              value={false}
              type="radio"
              id="active"
              name="active"
            />
            <span>false</span>
          </div>
        </div>
        <button className="add-btn" type="submit">
          Add Pizza
        </button>
      </form>
    </div>
  );
};

export default EditTopping;
