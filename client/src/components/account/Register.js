import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addPizzaToOrder,
  createOrder,
  fetchOrder,
  updatePizza,
} from "../../api";
import { fetchMe, registerUser } from "../../api/users";

import "./account.css";

export default function Register(props) {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState();
  const [birthday, setBirthday] = useState(Date);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Create Your Account</h2>
          </div>
          <form
            className="login-form"
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                let name = `${lastName}, ${firstName}`;
                if (password !== password2) {
                  setError("Passwords don't match!");
                } else {
                  const result = await registerUser(email, name, password);
                  if (result.error) {
                    setError(result.message);
                  } else {
                    let guestPizzas = [];
                    if (order) {
                      guestPizzas = order.pizzas;
                    }
                    console.log(currentUser);
                    console.log("Registered User:", result.user);

                    localStorage.setItem("token", result.token);
                    setError("");
                    setToken(result.token);
                    setPassword("");
                    setEmail("");
                    setPassword2("");
                    console.log("GUEST ORDER:", order);

                    console.log("GUEST PIZZAS:", guestPizzas);

                    const _order = await createOrder(
                      result.token,
                      result.user.id,
                      setOrderId
                    );

                    setOrderId("NEW ORDER ID:", _order.id);
                    const getOrder = await fetchOrder(result.token, _order.id);
                    console.log(getOrder);
                    if (guestPizzas) {
                      for (let pizza of guestPizzas) {
                        await updatePizza({
                          pizzaId: pizza.id,
                          userId: result.user.id,
                          name: pizza.name,
                          crustId: pizza.crustId,
                          sizeId: pizza.sizeId,
                          featured: pizza.featured,
                        });

                        await addPizzaToOrder(
                          result.token,
                          getOrder.id,
                          pizza.id,
                          pizza.amount,
                          navigate
                        );
                      }
                    }

                    console.log(
                      "order created for:",
                      result.user.email,
                      getOrder
                    );
                    setOrder(getOrder);
                  }
                }
              } catch (error) {
                throw error;
              }
            }}
          >
            <div className="form-input">
              <label>First Name * </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>Last Name * </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>E-mail Address * </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>Reenter Password *</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              ></input>
            </div>
            <small>{error}</small>
            <button>SIGN UP</button>
            Already have an account? <Link to="/login">Log in</Link>
          </form>
        </div>
      </div>
    </>
  );
}
