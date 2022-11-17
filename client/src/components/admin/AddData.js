import React from 'react';

const AddData = ({ handleSubmit, crusts, sizes, fncs }) => {

    const {
        setCrustId, setFeatured, setName, setSizeId
    } = fncs
    return (

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

    );
}

export default AddData;