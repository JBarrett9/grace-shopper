import React from 'react';
import Select from 'react-select';




const AddData = ({ data, sizes, crusts, user }) => {
    const { name, toppings, crustId, sizeId, setCrustId, setFeatured, setName, setSizeId, handleSubmitAdd, setToppingData, setAmount, setDouble } = data
    let options = toppings.map(t => {
        return {
            value: t,
            label: t.name
        }
    })

    
    

    return (
        <div className="admin-container">
            <form onSubmit={(e) => handleSubmitAdd(e)} className="admin-form">
                <div className="form-data">
                    <label>Pizza name:</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" id="name" name={"name"} value={name} />
                </div>

                <div className="form-data">
                    <label>featured:</label>
                    <div>
                        <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={true} />
                        <span>true</span>
                        <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={false} />
                        <span>false</span>
                    </div>
                </div>
                <div className="form-data">
                    <label>Size:</label>
                    <select
                        onChange={(e) => setSizeId(e.target.value)}
                        name="sizeId" value={sizeId}
                    >
                        <option value="">Select Size</option>
                        {sizes &&
                            sizes.map((size) => (
                                <option key={size.id} value={size.id} >
                                    {size.size}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-data">
                    <label>Crust:</label>
                    <select
                        onChange={(e) => setCrustId(e.target.value)}
                        name="crustId" value={crustId}
                    >
                        <option selected value="">Select Crust</option>
                        {crusts &&
                            crusts.map((crust) => (
                                <option key={crust.id} value={crust.id} >
                                    {crust.name}
                                </option>
                            ))}
                    </select>
                </div>
                
                <div className="form-data">
                    <label>Select toppings: </label>
                    <Select
                        isMulti
                        options = {options}
                        onChange={(selections) => setToppingData(selections)} 
                    />         
                </div>
                <div className="form-data">
                    <label>amount:</label>

                    <select
                        onChange={(e) => setAmount(e.target.value)}
                        name="amount"
                    >
                        <option selected value="">Select Amount</option>
                        <option selected value="full">Full</option>
                        <option selected value="left">Left</option>
                        <option selected value="right">Right</option>


                    </select>
                </div>

                <div className="form-data">
                    <label>double:</label>
                    <div>
                        <input onChange={(e) => setDouble(true)} type="radio" id="double" name="double" value={true} />
                        <span>true</span>
                        <input onChange={(e) => setDouble(false)} type="radio" id="double" name="double" value={false} />
                        <span>false</span>
                    </div>
                </div>
                <button className="add-btn" type="submit">Add Pizza</button>
            </form>
        </div>

    );
}

export default AddData;