import React from "react";
import Datatable from "../datatable";

export default function AdminToppings(props) {
  return (
    <>
      <div className="admin-main">
        <Datatable data={props.toppings} />
      </div>
    </>
  );
}
