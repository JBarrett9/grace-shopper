import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Books, Checkout } from "./components";
import Cart from "./components/Cart";
import Home from "./components/Home";
import styled from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Featured from "./components/Featured";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <StyledComponent>
      <Header />
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/books" element={<Books></Books>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/featured" element={<Featured />}></Route>
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
