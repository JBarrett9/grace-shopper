import { Routes } from "react-router-dom"
import "./Admin.css"
import { useEffect, useState } from "react";
import { fetchFeaturedPizzas } from "../../api";


const Admin = ({ sizes, crusts }) => {
    const [formData, setFormData] = useState({});
    const [pizzas, setPizzas] = useState([]);
    const [name, setName] = useState("");
    const [featured, setFeatured] = useState(null);
    const [crustId, setCrustId] = useState(null);
    const [sizeId, setSizeId] = useState(null);
    
    const getAllFeaturedPizzas = async () => {
        await fetchFeaturedPizzas(setPizzas);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            crustId:crustId,
            featured:featured,
            name:name,
            sizeId:sizeId,
            
        })
    }
    useEffect(() => {
        getAllFeaturedPizzas();
    }, []);
    return (
        <div className="Admin">
            <aside>
                <h1>Option</h1>
                <p>Featured Pizzas</p>

            </aside>
            <main>
                <h1>Pizzas</h1>
                <table className="item-container">
                    {
                        pizzas.map(p => {
                            return (
                                <tr className="item">
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td><button>Delete</button></td>
                                    <td><button>Edit</button></td>

                                    {console.log(p)}
                                </tr>
                            )
                        })
                    }
                </table>
                <form onSubmit={(e) => handleSubmit(e,formData)}>
                    <div className="form-data">
                        <input onChange={(e)=> setName(e.target.value)} type="text" id="name" name={"name"} value={name}/>
                    </div>

                    <div className="form-data">
                        <label>featured</label>
                        <input onChange={(e)=> setFeatured(e.target.value)} value={true} type="radio" id="featured" name="featured" />
                        <label>true</label>
                        <input onChange={(e)=> setFeatured(e.target.value)} value={false} type="radio" id="featured" name="featured" />
                        <label>false</label>
                    </div>
                    <div className="form-data">
                        <label>size</label>
                        <select
                        onChange={(e)=> setSizeId(e.target.value)} 
                        name="sizeId" value={sizeId}
                        >
                            {sizes &&
                                sizes.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.size}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="form-data">
                        <label>Crust:</label>
                        <select
                        onChange={(e)=> setCrustId(e.target.value)}    
                        name="crustId" value={crustId}
                        >
                            {crusts &&
                                crusts.map((crust) => (
                                    <option key={crust.id} value={crust.id}>
                                        {crust.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button type="submit">Submit</button>


                </form>
            </main>
        </div>
    )
}
export default Admin