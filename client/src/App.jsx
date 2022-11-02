import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Books } from "./components";

function App() {
  return (
    <>
      <div>Hi</div>
      <Routes>
        <Route path="/books" element={<Books></Books>}></Route>
      </Routes>
    </>
  );
}

export default App;
