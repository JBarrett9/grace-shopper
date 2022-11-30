import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import "./checkout.css";

const stripePromise = loadStripe(
  "pk_test_51M9VZmIs7qAUfwdpekl8hj0PgXrebgEG3fbCzSt8MiDZZpnSRnjbXSlOsSVeVqZYkoKvwiYFRD4fZZqzCGliL8v2007sjMYUt6"
);

const Checkout = (props) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${props.order.id}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ email: props.user.email }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            order={props.order}
            setOrder={props.setOrder}
            setOrderId={props.setOrderId}
            token={props.token}
            user={props.currentUser}
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
