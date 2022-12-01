import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTopping } from '../../../api/toppings';

const AddTopping = ({setIsUpDate}) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [quantity,setQuantity] = useState(0)
    const [category, setCategory] = useState([]) 
    const navigate = useNavigate()
  
    const handleSubmitAddTopping = async (e) =>{
        e.preventDefault()
        await addTopping(localStorage.getItem("token"), {name,price, quantity, category})
        setIsUpDate({})
        navigate("/admin/pizzas/toppings")
    }

    return (

        <div className='admin-container'>
           <form onSubmit={handleSubmitAddTopping} className="admin-form">
                <div className="form-data">
                    <label>Topping name:</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" id="topping-name" name={"name"} />
                </div>
                <div className="form-data">
                    <label>Price:</label>
                    <input onChange={(e) => setPrice(e.target.value)} type="text" id="topping-price" name={"price"} />
                </div>
                <div className="form-data">
                    <label>Quantity:</label>
                    <input onChange={(e) => setQuantity(e.target.value)} type="num" id="topping-quantity" name={"quantity"} min="0" max="20"/>
                </div>

             
                <div className="form-data">
                    <label>Category:</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        name="sizeId"
                    >
                        <option value="">Select Category</option>
                        <option value="meat">Meat</option>
                        <option value="cheese">Cheese</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="sauce">Sauce</option>
                    </select>
                </div>
           
                <button className="add-btn" type="submit">Add Pizza</button>
            </form>
        </div>
    );
}

export default AddTopping;
