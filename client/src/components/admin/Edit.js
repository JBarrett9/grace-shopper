import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPizza, updatePizzaById } from "../../api";

const Edit = ({ sizes, crusts, user }) => {
  const [pizza, setPizza] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(true);
  const [crustId, setCrustId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const { id } = useParams()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePizzaById(localStorage.getItem("token"), id, name, crustId, user.Id, sizeId, featured, setPizza )
    navigate("/admin")
  };


  const getPizzaById = async () => {
    await fetchPizza(id, setPizza)

  }
useEffect(() =>{
  setName(pizza.name)
    setFeatured(pizza.featured)
    setCrustId(pizza.crustId)
    setSizeId(pizza.sizeId)
}, [pizza])

  useEffect(() => {
    getPizzaById()
    
  }, [])

  return (
    <form className="edit-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-data">
        <label>Pizza name:</label>
        <input onChange={(e) => setName(e.target.value)} type="text" id="name" name={"name"} value={name} />
      </div>

      <div className="form-data">
        <label>featured:</label>
        <div>
          {console.log(featured)}
          <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={true} />
          <span>true</span>
          <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={false} />
          <span>false</span>
        </div>
      </div>
      <div className="form-data">
        <label>Size:</label>
        <select onChange={(e) => setSizeId(e.target.value)} name="sizeId" value={sizeId}>
          {sizes &&
            sizes.map((size) => <option value={size.id} key={size.id}>{size.size}</option>)}
        </select>
      </div>
      <div className="form-data">
        <label>Crust:</label>
        <select onChange={(e) => setCrustId(e.target.value)} name="crustId" value={crustId}>
          {crusts &&
            crusts.map((crust) => <option value={crust.id} key={crust.id}>{crust.name}</option>)}
        </select>
      </div>
      <button className="btn" type="submit">Edit Pizza</button>
      {console.log(pizza)}
    </form>
  );
};

export default Edit;
