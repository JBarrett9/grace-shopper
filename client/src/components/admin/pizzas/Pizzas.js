import { Link, Outlet,Route ,Routes, useNavigate} from "react-router-dom";
import "../Admin.css";
import { useEffect, useState } from "react";
import { createPizza, fetchFeaturedPizzas, deletePizzaById, fetchToppings, addToppingToPizza } from "../../../api";
import Table from "./Table";
import Edit from "./Edit";
import AddData from "./AddData";
import AdminToppings from "./AdminToppings";
import AddTopping from "./AddTopping";

const Pizzas = ({ sizes, crusts, user }) => {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(null);
  const [crustId, setCrustId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [isUpDate, setIsUpDate] = useState({});
  const [toppings, setToppings] = useState([])
  const [topping, setTopping] = useState([])
  const [double, setDouble] = useState(false)
  const [amount, setAmount] = useState("left")
  const getToppings = async() => {
        await fetchToppings(setToppings)
    }
  
    useEffect(() => {
        getToppings()
      
    }, []);

  const navigate = useNavigate()

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
let result = await addToppingToPizza(localStorage.getItem("token"), res.id, topping.id, amount, double )
console.log(result)
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

  const handleSubmitAdd = (e) => {
    e.preventDefault();
console.log(topping, double)
    getCreatePizza();
    navigate("/admin/pizzas")
    
  };
  useEffect(() => {
    getAllFeaturedPizzas();
  }, [isUpDate]);
  return (
    <div className="admin-pizzas">
      <nav>
        <Link to={""}>Pizzas</Link>
        <Link to={"add"}>AddPizza</Link>
        <Link to={"toppings"}>Toppings</Link>
        <Link to={"addTopping"}>Add Topping</Link>
      </nav>
      <Routes>
        <Route index element={<Table sizes={sizes} crusts={crusts} user={user} pizzas = {pizzas} handleDelete={handleDelete}/>} />
        <Route path='add' element={<AddData sizes={sizes} crusts={crusts} user={user} data ={{name, crustId,sizeId,setCrustId, setFeatured, featured, setName, setSizeId, setAmount,handleSubmitAdd, toppings,setTopping, double, setDouble}}/>} />
        <Route path='edit/:id' element={<Edit sizes={sizes} crusts={crusts} user={user} handleUpdate={setIsUpDate}/>} />
        <Route path='toppings' element={<AdminToppings toppings={toppings}/>} />
        <Route path='addTopping' element={<AddTopping />} />
      </Routes>
      <Outlet context={[pizzas, name, crustId,sizeId,featured, setCrustId, setFeatured, setName, setSizeId, handleDelete, handleSubmitAdd]} />


    </div>
  );
};
export default Pizzas;
