import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchUsers } from "../../api";

import "./Admin.css";

import Pizzas from "./pizzas/Pizzas";
import AdminToppings from "./AdminToppings";
import Users from "./Users";

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const { sizes, crusts, user, toppings, setToppings, token } = props;

    const getUsers = async () => {
        const result = await fetchUsers();
        setUsers(result);
    };

    useEffect(() => {
        getUsers();
    }, []);

  return (
    <div className="Admin">
      <aside className="admin-aside">
        <Link to="pizzas/">Pizzas</Link>
        <Link to="users">Users</Link>
      </aside>
      <main className="admin-main">
        <Routes>
        <Route path='pizzas/*' element={<Pizzas sizes={sizes} crusts={crusts} user={user} />} />
          <Route
            path="/users"
            element={<Users token={token} users={users} setUsers={setUsers} />}
          />
          <Route
            path="/topping"
            element={
              <AdminToppings toppings={toppings} setToppings={setToppings} />
            }
          />
        </Routes>
        {console.log(user)}
      </main>
    </div>
  );
};

export default Admin;
