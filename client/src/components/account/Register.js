import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";

import "./account.css";

export default function Register(props) {
  const { setToken, registerUser, currentUser } = props;
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
                console.log("name:", name);
                console.log(currentUser);

                const result = await registerUser(email, name, password);
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
