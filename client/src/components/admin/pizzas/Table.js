import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({pizzas, handleDelete}) => {

    return (

      <div className="admin-container">

        <table className="admin-table">
          <tr className="item">
            <th>Id</th>
            <th>Name</th>
            <th>CrustId</th>
            <th>SizeId</th>
            <th>Toppings</th>
            <th>Actions</th>
          </tr>
          
          {pizzas.map((p) => {
            return (
              <tr className="item">
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.crustId}</td>
                <td>{p.sizeId}</td>
                <td>{p.toppings.map(t => <p>{t.name}</p>)}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(p.id)}>Delete</button>
                  <Link className="btn edit" to={`edit/${p.id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
}

export default Table;
