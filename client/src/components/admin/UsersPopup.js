import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersPopup(props) {
  const { trigger, setEditUser, token, selectedUser } = props;

  const [admin, setAdmin] = useState(selectedUser.admin);
  const [guest, setGuest] = useState(selectedUser.guest);
  const [active, setActive] = useState(selectedUser.active);
  const [email, setEmail] = useState(selectedUser.email);
  const [name, setName] = useState(selectedUser.name);
  const [birthday, setBirthday] = useState(selectedUser.birthday);

  const navigate = useNavigate();

  return trigger ? (
    <>
      <>
        <div className="popup">
          <div className="login-container">
            <div className="login-header">
              <h2>EDIT USER</h2>
            </div>
            <form
              className="login-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  //   const result = await addPost(
                  //     title,
                  //     description,
                  //     price,
                  //     location,
                  //     willDeliver,
                  //     token
                  //   );
                  navigate("/users");
                  setEditUser(false);
                } catch (error) {
                  throw error;
                }
              }}
            >
              <div className="form-input">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email *"
                  required
                  value={email ? email : selectedUser.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    selectedUser.email = "";
                  }}
                ></input>
              </div>
              <div className="form-input">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={name ? name : selectedUser.name}
                  onChange={(e) => {
                    setName(e.target.value);
                    delete selectedUser.name;
                  }}
                ></input>
              </div>
              <label>
                Guest?
                <span>
                  <select>
                    <option
                      value={guest ? guest : selectedUser.guest}
                      onSelect={(e) => setGuest(!guest)}
                    >
                      {guest}
                    </option>
                    <option
                      value={guest ? !guest : !selectedUser.guest}
                      onSelect={(e) => setGuest(!guest)}
                    >
                      {!guest}
                    </option>
                  </select>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setGuest(!guest);
                    }}
                  ></input>
                </span>
              </label>

              <label>
                <span>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setActive(!active);
                    }}
                  ></input>
                  Active?
                </span>
              </label>

              <label>
                <span>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setAdmin(!admin);
                    }}
                  ></input>
                  Admin?
                </span>
              </label>
              <button>EDIT</button>
              <button
                onClick={() => {
                  setEditUser(false);
                }}
              >
                CLOSE
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  ) : (
    <></>
  );
}
