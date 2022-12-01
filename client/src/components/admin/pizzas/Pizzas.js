import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "../Admin.css";
import { useEffect, useState } from "react";
import {
  createPizza,
  fetchFeaturedPizzas,
  deletePizzaById,
  fetchToppings,
  addToppingToPizza,
} from "../../../api";
import Table from "./Table";
import Edit from "./Edit";
import AddData from "./AddData";
import AdminToppings from "./AdminToppings";
import AddTopping from "./AddTopping";
import EditTopping from "./EditTopping";

const Pizzas = ({ sizes, crusts, user }) => {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(null);
  const [crustId, setCrustId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isUpDate, setIsUpDate] = useState({});
  const [toppings, setToppings] = useState([]);
  const [toppingData, setToppingData] = useState([]);
  const [double, setDouble] = useState(false);
  const [amount, setAmount] = useState("left");
  const getToppings = async () => {
    await fetchToppings(setToppings);
  };

  useEffect(() => {
    getToppings();
  }, []);

  const navigate = useNavigate();

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
      featured,
      imgUrl
    );

    toppingData.forEach(async (el) => {
      let result = await addToppingToPizza(
        localStorage.getItem("token"),
        res.id,
        el.value.id,
        amount,
        double
      );
    });

    setIsUpDate(res);
    setName("");
    setImgUrl("");
    setFeatured("");
    setCrustId("");
    setSizeId("");
  };

  const handleDelete = async (pizzaId) => {
    await deletePizzaById(localStorage.getItem("token"), pizzaId);
    setIsUpDate({});
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    console.log(toppingData, double);
    getCreatePizza();
    navigate("/admin/pizzas");
  };
  useEffect(() => {
    getAllFeaturedPizzas();
    getToppings();
  }, [isUpDate]);
  return (
    <div className="admin-pizzas">
      {console.log(toppingData)}
      <nav>
        <Link to={""}>Pizzas</Link>
        <Link to={"add"}>AddPizza</Link>
        <Link to={"toppings"}>Toppings</Link>
        <Link to={"addTopping"}>Add Topping</Link>
      </nav>
      <Routes>
        <Route
          index
          element={
            <Table
              sizes={sizes}
              crusts={crusts}
              user={user}
              pizzas={pizzas}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="add"
          element={
            <AddData
              sizes={sizes}
              crusts={crusts}
              user={user}
              data={{
                name,
                crustId,
                sizeId,
                setCrustId,
                setFeatured,
                featured,
                setName,
                setSizeId,
                setAmount,
                handleSubmitAdd,
                toppings,
                setToppingData,
                double,
                setDouble,
                setImgUrl,
                imgUrl,
              }}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <Edit
              sizes={sizes}
              crusts={crusts}
              user={user}
              handleUpdate={setIsUpDate}
              toppings={toppings}
            />
          }
        />
        <Route
          path="toppings"
          element={
            <AdminToppings toppings={toppings} setIsUpDate={setIsUpDate} />
          }
        />
        <Route
          path="addTopping"
          element={<AddTopping setIsUpDate={setIsUpDate} />}
        />
        <Route
          path="/toppings/editTopping/:id"
          element={<EditTopping setIsUpDate={setIsUpDate} />}
        />
      </Routes>
      <Outlet
        context={[
          pizzas,
          name,
          crustId,
          sizeId,
          featured,
          setCrustId,
          setFeatured,
          setName,
          setSizeId,
          handleDelete,
          handleSubmitAdd,
        ]}
      />
    </div>
  );
};
export default Pizzas;
