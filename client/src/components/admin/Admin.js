import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchUsers } from "../../api";
import AddData from "./AddData";
import "./Admin.css";
import Edit from "./Edit";
import Pizzas from "./Pizzas";
import Users from "./Users";

const Admin = ({ sizes, crusts, user }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const result = await fetchUsers();
    setUsers(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="Admin">
      <aside>
        <Link to="">Pizzas</Link>
      </aside>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Pizzas sizes={sizes} crusts={crusts} user={user} />}
          />
          <Route path=":addData" element={<AddData />} />
          <Route
            path="/edit/:id"
            element={<Edit sizes={sizes} crusts={crusts} user={user} />}
          />
          <Route
            path="/users"
            element={<Users users={users} setUsers={setUsers} />}
          />
        </Routes>
        {console.log(user)}
      </main>
    </div>
  );
};

export default Admin;
