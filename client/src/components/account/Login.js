import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/users";
import "./account.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = props;

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
                  setError("You're logged in!");
                  localStorage.setItem("token", result.token);
                  setToken(result.token);
                  setPassword("");
                  setEmail("");
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
