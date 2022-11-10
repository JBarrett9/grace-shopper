import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/checkout/checkout";
import Cart from "./components/Cart";
import Home from "./Home";
import styled from "styled-components";
<<<<<<< HEAD
import Header from "./components/pages/Header";
import Menu from "./components/pages/Menu";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

=======
import Header from "./components/Header";
import Menu from "./components/Menu";
import Featured from "./components/Featured";
import Login from "./components/Login";
import Signup from "./components/Signup";
>>>>>>> 2ed07cbe3b4b7df37a3308dcbed58cf703bc4f92

function App() {
  return (
    <StyledComponent>
      <Header />
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </StyledComponent>
  );
}
const StyledComponent = styled.div`
  width: 100vw;
`;

export default App;
