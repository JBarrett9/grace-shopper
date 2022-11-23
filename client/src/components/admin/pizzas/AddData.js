import React from 'react';
import Select from 'react-select'

const AddData = ({data,sizes, crusts, user}) => {
    const {name,toppings, crustId,sizeId,setCrustId, setFeatured, setName, setSizeId,handleSubmitAdd, setTopping} = data

    const options = toppings.map(top => {
        return {
            value: top,
            label: top.name
        }
    })
    return (
        <div className="admin-container">
            <form onSubmit={(e) => handleSubmitAdd(e)} className="admin-form">
                <div className="form-data">
                    <label>Pizza name:</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" id="name" name={"name"} value={name}/>
                </div>

                <div className="form-data">
                    <label>featured:</label>
                    <div>
                        <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={true} />
                        <span>true</span>
                        <input onChange={(e) => setFeatured(e.target.value)} type="radio" id="featured" name="featured" value={false}/>
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
                    <Select
                        options={options} 
                        defaultValue={[options[0], options[3]]}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=> setTopping(e)}
                    />
                </div>
                <button className="add-btn" type="submit">Add Pizza</button>
            </form>
        </div>

    );
}

export default AddData;