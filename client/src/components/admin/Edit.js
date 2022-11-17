import { useState } from "react";


const Edit = ({sizes, crusts}) => {
    const [pizzas, setPizzas] = useState([]);
    const [name, setName] = useState("");
    const [featured, setFeatured] = useState(null);
    const [crustId, setCrustId] = useState(null);
    const [sizeId, setSizeId] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-data">
                <label>Pizza name:</label>
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" name={"name"} />
            </div>

            <div className="form-data">
                <label>featured:</label>
                <div>
                    <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" />
                    <span>true</span>
                    <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" />
                    <span>false</span>
                </div>
            </div>
            <div className="form-data">
                <label>Size:</label>
                <select
                    onChange={(e) => setSizeId(e.target.value)}
                    name="sizeId"
                >
                    {sizes &&
                        sizes.map((size) => (
                            <option key={size.id} >
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
                >
                    {crusts &&
                        crusts.map((crust) => (
                            <option key={crust.id} >
                                {crust.name}
                            </option>
                        ))}
                </select>
            </div>
            <button type="submit">Add Pizza</button>
        </form>

    )
}

export default Edit