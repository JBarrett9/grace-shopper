import React from 'react';

const AddData = ({ handleSubmit, crusts, sizes, fncs, data }) => {
    const{
        sizeId, crustId, name, featured
    } = data

    const {
        setCrustId, setFeatured, setName, setSizeId
    } = fncs
    return (

        <form onSubmit={(e) => handleSubmit(e)}>
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
            <button type="submit">Add Pizza</button>
        </form>

    );
}

export default AddData;