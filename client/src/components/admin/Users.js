import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../api";
import Datatable from "../datatable";
import UsersPopup from "./UsersPopup";

export default function Users(props) {
  const { users, setUsers, token } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState(false);
  const [guest, setGuest] = useState(false);
  const [active, setActive] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  function userMatches(users, text, admin, guest, active) {
    text = text.toLowerCase();

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

  const columns = usersToDisplay[0] && Object.keys(usersToDisplay[0]);
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
        <table cellPadding={2} cellSpacing={2}>
          <thead>
            <tr>
              {usersToDisplay[0] &&
                columns.map((heading) => <th>{heading.toUpperCase()}</th>)}
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((row, idx) => (
              <tr>
                {columns.map((column) => (
                  <td>
                    {typeof row[column] === "boolean" ? (
                      <>
                        <input
                          type="checkbox"
                          value={row[column]}
                          checked={row[column]}
                          disabled={true}
                        ></input>
                      </>
                    ) : column === "createddate" || column === "birthday" ? (
                      ((column = new Date(row[column])),
                      column.toISOString().substring(0, 10))
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    onClick={async (e) => {
                      setEditUser(true);
                      setSelectedUser(row);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UsersPopup
        selectedUser={selectedUser}
        token={token}
        trigger={editUser}
        setEditUser={setEditUser}
      ></UsersPopup>
    </>
  );
}
