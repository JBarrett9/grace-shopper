import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchActiveUserOrder, loginUser } from "../../api/users";
import {
  addPizzaToOrder,
  createOrder,
  fetchOrder,
  updatePizza,
} from "../../api";
import { fetchMe, registerUser } from "../../api/users";

import "./account.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {
    setToken,
    registerUser,
    currentUser,
    order,
    setOrderId,
    setOrder,
    setCurrentUser,
    orderId,
  } = props;

  let navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Log In</h2>
          </div>
          <form
            className="login-form"
            onSubmit={async (e) => {
              try {
                e.preventDefault();

                const result = await loginUser(email, password);
                console.log(result);

                if (result.error) {
                  setError(result.message);
                } else {
                  let guestPizzas = [];
                  if (order) {
                    guestPizzas = order.pizzas;
                  }

                  setError("You're logged in!");
                  localStorage.setItem("token", result.token);
                  setToken(result.token);
                  setPassword("");
                  setEmail("");

                  const activeOrder = await fetchActiveUserOrder(
                    result.token,
                    result.user.id
                  );

                  console.log("ACTIVE ORDER:", activeOrder);
                  console.log("GUEST PIZZAS:", guestPizzas);
                  if (!activeOrder) {
                    const _order = await createOrder(
                      result.token,
                      result.user.id,
                      setOrderId
                    );
                    setOrderId(_order.id);
                    const getOrder = await fetchOrder(result.token, _order.id);
                    console.log(
                      "order created for:",
                      result.user.email,
                      getOrder
                    );
                    for (let pizza of guestPizzas) {
                      await addPizzaToOrder(
                        result.token,
                        getOrder.id,
                        pizza.id,
                        pizza.amount,
                        navigate
                      );
                    }
                    setOrder(getOrder);
                    console.log("ACTIVE ORDER DOES NOT EXISTS:", getOrder);
                  } else {
                    const getOrder = await fetchOrder(
                      result.token,
                      activeOrder.id
                    );

                    if (guestPizzas) {
                      for (let pizza of guestPizzas) {
                        await addPizzaToOrder(
                          result.token,
                          activeOrder.id,
                          pizza.id,
                          pizza.amount,
                          navigate
                        );
                        const _result = await updatePizza({
                          userId: result.user.id,
                        });
                        console.log(_result);
                      }
                    }
                    setOrder(getOrder);
                    console.log("ACTIVE ORDER EXISTS:", getOrder);
                  }
                }
              } catch (error) {
                throw error;
              }
            }}
          >
            <div className="form-input">
              <label>E-mail Address * </label>
              <input
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>Password *</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <small>{error}</small>
            <button>LOG IN</button>
            Don't have an account? <Link to="/register">Sign up</Link>
          </form>
        </div>
      </div>
    </>
  );
}
