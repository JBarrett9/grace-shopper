import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/users";
import "./login.css";

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
          <form className="login-form">
            <div className="form-input">
              <label>Username</label>
              <input
                type="text"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <small>{error}</small>
            </div>
            <button>LOG IN</button>
            <Link to="/register">Don't have an account? Sign up</Link>
          </form>
        </div>
      </div>
    </>
  );
}
