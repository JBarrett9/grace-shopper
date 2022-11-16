import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, fetchOrder } from "../../api";
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
                    console.log(currentUser);
                    console.log("Registered User:", result.user);
                    setError("");
                    localStorage.setItem("token", result.token);
                    setToken(result.token);
                    setPassword("");
                    setEmail("");
                    setPassword2("");
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
                    await setOrder(getOrder);
                    console.log("this is the order:", order);
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
