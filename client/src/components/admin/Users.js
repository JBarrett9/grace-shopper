import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../api";
import Datatable from "../datatable";

export default function Users(props) {
  const { users, setUsers } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState(false);
  const [guest, setGuest] = useState(false);
  const [active, setActive] = useState(false);

  function userMatches(users, text, admin, guest, active) {
    text = text.toLowerCase();
    console.log(users);
    console.log(text, admin, guest, active);

    if (
      (String(users.id).toLowerCase().includes(`${text}`) ||
        users.email.toLowerCase().includes(`${text}`) ||
        users.name.toLowerCase().includes(`${text}`)) &&
      (users.active === active ||
        (users.guest === guest && users.admin === admin))
    ) {
      return true;
    } else {
      return false;
    }
  }

  const filteredUsers = users.filter((users) =>
    userMatches(users, searchTerm, admin, guest, active)
  );

  const usersToDisplay =
    searchTerm.length || active || guest || admin ? filteredUsers : users;

  const getUsers = async () => {
    const result = await fetchUsers();
    setUsers(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="admin">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
        <label>ADMIN?</label>
        <input
          type="checkbox"
          value={admin}
          onChange={(e) => {
            setAdmin(!admin);
          }}
        ></input>
        <label>GUEST?</label>
        <input
          type="checkbox"
          value={guest}
          onChange={(e) => {
            setGuest(!guest);
          }}
        ></input>
        <label>ACTIVE?</label>
        <input
          type="checkbox"
          value={active}
          onChange={(e) => {
            setActive(!active);
          }}
        ></input>
      </div>
      <div className="admin-main">
        <Datatable data={usersToDisplay} />
      </div>
    </>
  );
}
