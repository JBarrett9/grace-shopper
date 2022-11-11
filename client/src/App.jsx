import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/home";
import Header from "./components/header/Header";
import Login from "./components/account/Login";
import Size from "./components/size/size";
import { fetchMe, registerUser } from "./api/users";
import Register from "./components/account/Register";

function App() {
  const [orderId, setOrderId] = useState();
  const [order, setOrder] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    function randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    console.log("token:", localStorageToken);

    async function createGuest() {
      let randomEmail = randomString(20);
      randomEmail += "@saucebossguest.com";
      let randomPassword = randomString(20);

      let guestUser = {
        email: randomEmail,
        password: randomPassword,
        name: "Guest",
      };

      const result = await registerUser(
        guestUser.email,
        guestUser.password,
        guestUser.name
      );

      setCurrentUser(result);
      setToken(result.token);
      localStorage.setItem("token", result.token);
    }

    if (!localStorageToken) {
      createGuest();
    }
  }, []);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    async function getMe() {
      const result = await fetchMe(localStorageToken);
      setCurrentUser(result);
      setToken(localStorageToken);
      console.log(result);
    }
    if (localStorageToken) {
      getMe();
    }
  }, [token]);

  return (
    <>
      <Header numItems={order.length} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} registerUser={registerUser} />}
        ></Route>
        <Route
          path="/:pizzaId/size"
          element={
            <Size token={token} orderId={orderId} setOrderId={setOrderId} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
