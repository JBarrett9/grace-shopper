// import React from "react";
// import Datatable from "../../datatable";

// export default function AdminToppings(props) {
//   return (
//     <>
//       <div className="admin-main">
//         <Datatable data={props.toppings} />
//       </div>
//     </>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import {deleteToppingById} from "../../../api/toppings"

const AdminToppings = ({toppings}) => {

const navigate = useNavigate()
    const handleDeleteTopping = async (id) => {
        await deleteToppingById(localStorage.getItem("token") ,id)
        navigate("/admin/pizzas/toppings")
    }
    
    return (
        <div className="admin-container">
            <table className="admin-table">
                <tr className="item">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>

                {toppings.map((p) => {
                    return (
                        <tr className="item">
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.quantity}</td>
                            <td>{p.category}</td>
                            <td>
                                
                                <Link className="btn delete" onClick={(e) => handleDeleteTopping(p.id)}>Delete</Link>
                                <Link className="btn edit" to={`edit/${p.id}`}>Edit</Link>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    )
}
export default AdminToppings