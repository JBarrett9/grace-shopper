import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/home";
import Header from "./components/header/Header";
import Login from "./components/account/Login";
import Size from "./components/size/size";
import { fetchActiveUserOrder, fetchMe, registerUser } from "./api/users";
import Register from "./components/account/Register";
import { fetchCrusts, fetchOrder, fetchSizes, fetchToppings } from "./api";
import Cart from "./components/cart/cart";
import Toppings from "./components/toppings/toppings";

function App() {
  const [orderId, setOrderId] = useState();
  const [order, setOrder] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [sizes, setSizes] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [toppings, setToppings] = useState([]);

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
    const getStuff = async () => {
      await fetchCrusts(setCrusts);
      await fetchSizes(setSizes);
      await fetchToppings(setToppings);
    };

    getStuff();

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

    async function getOrder() {
      const { id } = await fetchActiveUserOrder(
        localStorageToken,
        currentUser.id
      );
      setOrderId(id);

      const order = await fetchOrder(localStorageToken, id);
      setOrder(order);
      console.log(order);
    }

    if (currentUser.id) getOrder();
  }, [token]);

  const getNum = () => {
    let total = 0;
    for (let pizza of order.pizzas) {
      total += pizza.amount;
    }
    return total;
  };

  return (
    <>
      <Header
        currentUser={currentUser}
        numItems={order.pizzas ? getNum() : 0}
      />
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
            <Size
              token={token}
              orderId={orderId}
              setOrderId={setOrderId}
              setOrder={setOrder}
              user={currentUser}
              sizes={sizes}
              crusts={crusts}
            />
          }
        ></Route>
        <Route
          path="/:pizzaId/toppings"
          element={<Toppings toppings={toppings} />}
        />
        <Route
          path="/cart"
          element={<Cart order={order} sizes={sizes} crusts={crusts} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
