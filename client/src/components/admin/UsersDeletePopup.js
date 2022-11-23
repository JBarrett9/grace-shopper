import React from "react";

export default function UsersDeletePopup(props) {
  const { trigger, selectedUser, setDeleteUser, token } = props;

  return trigger ? (
    <>
      <div className="popup">
        <div className="delete-container">
          <div>{`Are you sure you would like to delete ${selectedUser.email}?`}</div>
          <div>
            <button onClick={() => console.log("DELETE")}>Yes</button>
            <button onClick={() => setDeleteUser(false)}>No</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
