import { useState } from "react";
import Cart from "./cart";
import { Customize, Menu, Payment } from "./steps";

const Checkout = () => {
  const [step, setStep] = useState(1);

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <Menu />;
      case 2:
        return <Customize />;
      case 3:
        return <Cart />;
      case 4:
        return <Payment />;
    }
  };

  return <div>{renderStep(step)}</div>;
};

export default Checkout;
