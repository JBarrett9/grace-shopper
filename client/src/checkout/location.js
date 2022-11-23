import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addLocation,
  fetchLocationsByUserID,
  updateLocation,
} from "../api/location";
import "./location.css";

const Location = (props) => {
  const [delivery, setDelivery] = useState(true);
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userLocation, setUserLocation] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserLocation() {
      const locations = await fetchLocationsByUserID(props.user.id);
      const location = locations[0];
      if (location.id) {
        setUserLocation(location);
        setAddress(location.address);
        setApartment(location.apartment);
        setCity(location.city);
        setState(location.state);
        setZipcode(location.zipcode);
      }
    }

    getUserLocation();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLocation.id) {
      if (
        userLocation.address == address &&
        userLocation.apartment == apartment &&
        userLocation.city == city &&
        userLocation.state == state &&
        userLocation.zipcode == zipcode
      ) {
        navigate("checkout");
      } else {
        const location = await updateLocation(
          props.token,
          userLocation.id,
          city,
          state,
          address,
          apartment,
          true,
          zipcode
        );

        if (location.id) {
          navigate("/checkout");
        }
      }
    } else {
      const location = await addLocation(
        props.token,
        city,
        state,
        address,
        apartment,
        true,
        zipcode
      );
      if (location.id) {
        navigate("/checkout");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="addr-form">
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
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="adr"
            />
          </span>
          <span>
            <label>Apt/Suite: </label>
            <input
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              type="text"
              name="apt"
            />
          </span>
          <span>
            <label>City:</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
            ></input>
            <label>State: </label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {states.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>
            <label>Zip: </label>
            <input
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              type="text"
              name="zip"
            ></input>
          </span>
        </>
      ) : (
        <span>
          <label>Zip Code:</label>
          <input
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            type="text"
            name="zip"
          />
        </span>
      )}
      <button>Next</button>
    </form>
  );
};

export default Location;
