import { useState } from "react";
import "./location.css";

const Location = () => {
  const [delivery, setDelivery] = useState(true);
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "AS",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  return (
    <form className="addr-form">
      <span className="delivery-selection">
        <label
          className={
            delivery ? "delivery-toggle option-selected" : "delivery-toggle"
          }
        >
          Delivery
          <input
            checked={delivery}
            onChange={() => setDelivery(true)}
            type="radio"
            name="delivery"
          />
        </label>
        <label
          className={
            delivery ? "delivery-toggle" : "delivery-toggle option-selected"
          }
        >
          Pickup
          <input
            checked={!delivery}
            onChange={() => setDelivery(false)}
            type="radio"
            name="delivery"
          />
        </label>
      </span>
      {delivery ? (
        <>
          <span>
            <label>Street Address: </label>
            <input type="text" name="adr" />
          </span>
          <span>
            <label>Apt/Suite: </label>
            <input type="text" name="apt" />
          </span>
          <span>
            <label>City:</label>
            <input type="text" name="city"></input>
            <label>State: </label>
            <select>
              <option value="">Select</option>
              {states.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>
            <label>Zip: </label>
            <input type="text" name="zip"></input>
          </span>
        </>
      ) : (
        <span>
          <label>Zip Code:</label>
          <input type="text" name="zip" />
        </span>
      )}
      <button>Next</button>
    </form>
  );
};

export default Location;
