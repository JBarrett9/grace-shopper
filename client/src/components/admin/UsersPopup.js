import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/users";

export default function UsersPopup(props) {
  const { trigger, setEditUser, token, selectedUser } = props;

  const [admin, setAdmin] = useState(selectedUser.admin);
  const [guest, setGuest] = useState(selectedUser.guest);
  const [active, setActive] = useState(selectedUser.active);
  const [email, setEmail] = useState(selectedUser.email);
  const [name, setName] = useState(selectedUser.name);
  const [birthday, setBirthday] = useState(selectedUser.birthday);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedUser);
    setEmail(selectedUser.email);
    setGuest(selectedUser.guest);
    setActive(selectedUser.active);
    setEmail(selectedUser.email);
    setName(selectedUser.name);
    setAdmin(selectedUser.admin);
  }, [selectedUser]);

  return trigger ? (
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
                console.log(guest);
                await updateUser(
                  name,
                  email,
                  active,
                  admin,
                  guest,
                  birthday,
                  token,
                  selectedUser.id
                );
                navigate("/admin/users");
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
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  delete selectedUser.email;
                }}
              ></input>
            </div>
            <div className="form-input">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name *"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  delete selectedUser.name;
                }}
              ></input>
            </div>
            <label>
              Active?
              <span>
                <select
                  value={selectedUser.active ? selectedUser.active : active}
                  onChange={(e) => {
                    setActive(e.target.value);
                    delete selectedUser.active;
                  }}
                >
                  <option value={true}>TRUE</option>
                  <option value={false}>FALSE</option>
                </select>
              </span>
            </label>

            <label>
              Guest?
              <span>
                <select
                  value={selectedUser.guest ? selectedUser.guest : guest}
                  onChange={(e) => {
                    setGuest(e.target.value);
                    delete selectedUser.guest;
                  }}
                >
                  <option value={true}>TRUE</option>
                  <option value={false}>FALSE</option>
                </select>
              </span>
            </label>

            <label>
              Admin?
              <span>
                <select
                  value={selectedUser.admin ? selectedUser.admin : admin}
                  onChange={(e) => {
                    setAdmin(e.target.value);
                    delete selectedUser.admin;
                  }}
                >
                  <option value={true}>TRUE</option>
                  <option value={false}>FALSE</option>
                </select>
              </span>
            </label>

            <button>EDIT</button>
            <button
              onClick={() => {
                setEditUser(false);
                setActive();
                setAdmin();
                setName();
                setEmail();
                setGuest();
              }}
            >
              CLOSE
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
