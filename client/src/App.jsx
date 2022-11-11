import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/home/home";
import styled from "styled-components";
import Header from "./components/header/Header";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Size from "./components/size/size";

function App() {
  const [order, setOrder] = useState([]);

  return (
    <StyledComponent>
      <Header numItems={order.length} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/:pizzaId/size" element={<Size />}></Route>
      </Routes>
    </StyledComponent>
  );
}
const StyledComponent = styled.div`
  width: 100vw;
`;

export default App;
