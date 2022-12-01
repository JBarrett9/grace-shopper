import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToppingToPizza,
  destroyPizzaToppings,
  fetchPizza,
  updatePizzaById,
} from "../../../api";
import Select from "react-select";

const Edit = ({ sizes, crusts, user, handleUpdate, toppings }) => {
  const [pizza, setPizza] = useState({});
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [featured, setFeatured] = useState(true);
  const [crustId, setCrustId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [double, setDouble] = useState(false);
  const [amount, setAmount] = useState("full");
  const [selectedOption, setSelectedOption] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  let options = toppings.map((el) => {
    return {
      value: el,
      label: el.name,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = user.id;
    await updatePizzaById(localStorage.getItem("token"), id, {
      name,
      crustId,
      sizeId,
      userId,
      featured,
      imgUrl,
    });
    await destroyPizzaToppings(id, localStorage.getItem("token"));

    selectedOption.forEach(async (el) => {
      let r = await addToppingToPizza(
        localStorage.getItem("token"),
        id,
        el.value.id,
        amount,
        double
      );
      console.log(r);
    });
    navigate("/admin/pizzas");
    handleUpdate({});
  };

  const getPizzaById = async () => {
    let res = await fetchPizza(id);
    setPizza(res);
    setSelectedOption(res.toppings.map((el) => options[el.toppingId - 1]));
  };
  useEffect(() => {
    setName(pizza.name);
    setFeatured(pizza.featured);
    setCrustId(pizza.crustId);
    setSizeId(pizza.sizeId);
  }, [pizza]);

  useEffect(() => {
    getPizzaById();
  }, []);

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-data">
          <label>Pizza name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name={"name"}
            value={name}
          />
        </div>

        <div className="form-data">
          <label>Image URL:</label>
          <input
            onChange={(e) => setImgUrl(e.target.value)}
            type="text"
            id="img-url"
            name="img-url"
            value={imgUrl}
          />
        </div>

        <div className="form-data">
          <label>featured:</label>
          <div>
            <input
              onChange={(e) => setFeatured(e.target.value)}
              type="radio"
              id="featured"
              name="featured"
              value={true}
            />
            <span>true</span>
            <input
              onChange={(e) => setFeatured(e.target.value)}
              type="radio"
              id="featured"
              name="featured"
              value={false}
            />
            <span>false</span>
          </div>
        </div>
        <div className="form-data">
          <label>Size:</label>
          <select
            onChange={(e) => setSizeId(e.target.value)}
            name="sizeId"
            value={sizeId}
          >
            {sizes &&
              sizes.map((size) => (
                <option value={size.id} key={size.id}>
                  {size.size}
                </option>
              ))}
          </select>
        </div>
        <div className="form-data">
          <label>Crust:</label>
          <select
            onChange={(e) => setCrustId(e.target.value)}
            name="crustId"
            value={crustId}
          >
            {crusts &&
              crusts.map((crust) => (
                <option value={crust.id} key={crust.id}>
                  {crust.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-data">
          <label>Toppings</label>
          <Select
            isMulti
            options={options}
            value={selectedOption}
            isClearable={true}
            onChange={(e) => {
              setSelectedOption(e);
            }}
          />
        </div>
        <div className="form-data">
          <label>amount:</label>

          <select
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            name="amount"
          >
            <option selected value="full">
              Full
            </option>
            <option selected value="left">
              Left
            </option>
            <option selected value="right">
              Right
            </option>
          </select>
        </div>

        <div className="form-data">
          <label>double:</label>
          <div>
            <input
              onChange={(e) => setDouble(true)}
              type="radio"
              id="double"
              name="double"
              value={true}
            />
            <span>true</span>
            <input
              onChange={(e) => setDouble(false)}
              type="radio"
              id="double"
              name="double"
              value={false}
            />
            <span>false</span>
          </div>
        </div>
        <button className="add-btn" type="submit">
          Edit Pizza
        </button>
        {console.log(pizza)}
      </form>
    </div>
  );
};

export default Edit;
