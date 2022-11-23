import React from 'react';
import { useState } from 'react';

const AddTopping = ({categories}) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [quantity,setQuantity] = useState(0)
    const [category, setCategory] = useState([]) 

    const fetchCategories = async() => {

    }

    const handleSubmitAddTopping = async () =>{
        
    }

    return (

        <div className='admin-container'>
           <form onSubmit={(e) => handleSubmitAddTopping(e)} className="admin-form">
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
                    <input onChange={(e) => setQuantity(e.target.value)} type="num" id="topping-quantity" name={"quantity"} />
                </div>

             
                <div className="form-data">
                    <label>Category:</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        name="sizeId"
                    >
                        <option value="">Select Category</option>
                        {categories &&
                            categories.map((size) => (
                                <option key={size.id} value={size.id} >
                                    {size.size}
                                </option>
                            ))}
                    </select>
                </div>
           
                <button className="add-btn" type="submit">Add Pizza</button>
            </form>
        </div>
    );
}

export default AddTopping;
