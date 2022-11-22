import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchActiveUserOrder, loginUser } from "../../api/users";
import {
  addPizzaToOrder,
  createOrder,
  createPizza,
  destroyPizza,
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
                let guestPizzas = [];
                if (guestPizzas.length > 0) {
                  guestPizzas = order.pizzas;
                  for (let pizza of guestPizzas) {
                    await destroyPizza(currentUser.token, pizza.id);
                  }
                }

                const result = await loginUser(email, password);
                console.log(result);

                if (result.error) {
                  setError(result.message);
                } else {
                  setError("You're logged in!");
                  localStorage.setItem("token", result.token);
                  setToken(result.token);
                  setPassword("");
                  setEmail("");
                  if (order) {
                    guestPizzas = order.pizzas;
                  }

                  console.log(guestPizzas);

                  let activeOrder = await fetchActiveUserOrder(
                    result.token,
                    result.user.id
                  );

                  console.log(activeOrder);
                  console.log("ACTIVE ORDER:", activeOrder);
                  console.log("GUEST PIZZAS:", guestPizzas);
                  if (!activeOrder) {
                    const _order = await createOrder(
                      result.token,
                      result.user.id,
                      setOrderId
                    );
                    setOrderId(_order.id);
                    let getOrder = await fetchOrder(result.token, _order.id);

                    for (let pizza of guestPizzas) {
                      let token = result.token;
                      let name = pizza.name;
                      let crustId = pizza.crustId;
                      let userId = result.user.id;
                      let featured = false;
                      let size = pizza.sizeId;

                      const _pizza = await createPizza(
                        token,
                        name,
                        crustId,
                        userId,
                        size,
                        featured
                      );

                      await addPizzaToOrder(
                        result.token,
                        getOrder.id,
                        _pizza.id,
                        pizza.amount,
                        navigate
                      );
                    }
                    getOrder = await fetchOrder(result.token, activeOrder.id);
                    setOrder(getOrder);
                    console.log("ACTIVE ORDER DOES NOT EXISTS:", getOrder);
                  } else {
                    setOrder(activeOrder);

                    if (guestPizzas) {
                      for (let pizza of guestPizzas) {
                        let token = result.token;
                        let name = pizza.name;
                        let crustId = pizza.crustId;
                        let userId = result.user.id;
                        let featured = false;
                        let size = pizza.sizeId;

                        const _pizza = await createPizza(
                          token,
                          name,
                          crustId,
                          userId,
                          size,
                          featured
                        );

                        await addPizzaToOrder(
                          result.token,
                          activeOrder.id,
                          _pizza.id,
                          pizza.amount,
                          navigate
                        );
                      }
                    }
                    activeOrder = await fetchOrder(
                      result.token,
                      activeOrder.id
                    );
                    setOrder(activeOrder);
                    console.log("ACTIVE ORDER EXISTS:", activeOrder);
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
