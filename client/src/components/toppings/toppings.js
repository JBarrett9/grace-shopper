import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToppingToPizza,
  destroyPizzaToppings,
  fetchOrder,
  fetchPizza,
  fetchToppingsByCategory,
} from "../../api";
import "./toppings.css";

const Toppings = (props) => {
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const [existingToppings, setExistingToppings] = useState([]);

  const [meats, setMeats] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [selectedCheeses, setSelectedCheeses] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [category, setCategory] = useState(1);

  useEffect(() => {
    async function getToppings() {
      const pizza = await fetchPizza(pizzaId);
      let toppings = [];
      if (pizza.toppings) {
        toppings = pizza.toppings.map((topping) => topping.toppingId);
        console.log(pizza);
      }

      setExistingToppings(toppings);

      const meats = await fetchToppingsByCategory("meat");
      const vegetables = await fetchToppingsByCategory("vegetable");
      const cheeses = await fetchToppingsByCategory("cheese");
      const sauces = await fetchToppingsByCategory("sauce");

      setMeats(meats);
      setVegetables(vegetables);
      setCheeses(cheeses);
      setSauces(sauces);

      const meatArr = meats.map((meat) => {
        const idx = toppings.indexOf(meat.id);
        return {
          id: meat.id,
          selected: toppings.includes(meat.id),
          amount: toppings.amount || "full",
          double: toppings.double || false,
        };
      });
      setSelectedMeats(meatArr);

      const vegArr = vegetables.map((vegetable) => ({
        id: vegetable.id,
        selected: toppings.includes(vegetable.id),
        amount: "full",
        double: false,
      }));
      setSelectedVegetables(vegArr);

      const cheeseArr = cheeses.map((cheese) => ({
        id: cheese.id,
        selected: toppings.includes(cheese.id),
        amount: "full",
        double: false,
      }));
      setSelectedCheeses(cheeseArr);

      const sauceArr = sauces.map((sauce) => ({
        id: sauce.id,
        selected: toppings.includes(sauce.id),
        amount: "full",
        double: false,
      }));
      setSelectedSauces(sauceArr);
    }

    getToppings();
  }, []);

  const handleMeatSelect = (idx) => {
    if (selectedMeats[idx].selected) {
      let arrCopy = [...selectedMeats];
      arrCopy[idx].selected = false;
      setSelectedMeats(arrCopy);
    } else {
      let arrCopy = [...selectedMeats];
      arrCopy[idx].selected = true;
      setSelectedMeats(arrCopy);
    }
  };

  const handleVegetableSelect = (idx) => {
    if (selectedVegetables[idx].selected) {
      let arrCopy = [...selectedVegetables];
      arrCopy[idx].selected = false;
      setSelectedVegetables(arrCopy);
    } else {
      let arrCopy = [...selectedVegetables];
      arrCopy[idx].selected = true;
      setSelectedVegetables(arrCopy);
    }
  };

  const handleCheeseSelect = (idx) => {
    if (selectedCheeses[idx].selected) {
      let arrCopy = [...selectedCheeses];
      arrCopy[idx].selected = false;
      setSelectedCheeses(arrCopy);
    } else {
      let arrCopy = [...selectedCheeses];
      arrCopy[idx].selected = true;
      setSelectedCheeses(arrCopy);
    }
  };

  const handleSauceSelect = (idx) => {
    if (selectedSauces[idx].selected) {
      let arrCopy = [...selectedSauces];
      arrCopy[idx].selected = false;
      setSelectedSauces(arrCopy);
    } else {
      let arrCopy = [...selectedSauces];
      arrCopy[idx].selected = true;
      setSelectedSauces(arrCopy);
    }
  };

  const addToppingsToPizza = async () => {
    if (existingToppings.length) {
      await destroyPizzaToppings(pizzaId, props.token);
    }

    for (let meat of selectedMeats) {
      if (meat.selected) {
        await addToppingToPizza(
          props.token,
          pizzaId,
          meat.id,
          meat.amount,
          meat.double
        );
      }
    }

    for (let vegetable of selectedVegetables) {
      if (vegetable.selected) {
        await addToppingToPizza(
          props.token,
          pizzaId,
          vegetable.id,
          vegetable.amount,
          vegetable.double
        );
      }
    }

    for (let cheese of selectedCheeses) {
      if (cheese.selected) {
        await addToppingToPizza(
          props.token,
          pizzaId,
          cheese.id,
          cheese.amount,
          cheese.double
        );
      }
    }

    for (let sauce of selectedSauces) {
      if (sauce.selected) {
        await addToppingToPizza(
          props.token,
          pizzaId,
          sauce.id,
          sauce.amount,
          sauce.double
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addToppingsToPizza();
    const order = await fetchOrder(props.token, props.orderId);
    props.setOrder(order);
    navigate("/cart");
  };

  const renderToppings = (category) => {
    switch (category) {
      case 1:
        return (
          <div>
            {sauces.length &&
              sauces.map((sauce, idx) => (
                <span className="topping" key={sauce.id}>
                  <input
                    type="checkbox"
                    value={selectedSauces[idx].selected}
                    checked={selectedSauces[idx].selected}
                    data-idx={idx}
                    onChange={(e) =>
                      handleSauceSelect(e.target.getAttribute("data-idx"))
                    }
                  />
                  <label>{sauce.name}</label>
                  {selectedSauces[idx].selected && (
                    <>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedSauces[idx].amount === "left"}
                          onChange={() => {
                            let arrCopy = [...selectedSauces];
                            arrCopy[idx].amount = "left";
                            setSelectedSauces(arrCopy);
                          }}
                        />
                        <span className="checkmark left" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedSauces[idx].amount === "full"}
                          onChange={() => {
                            let arrCopy = [...selectedSauces];
                            arrCopy[idx].amount = "full";
                            setSelectedSauces(arrCopy);
                          }}
                        />
                        <span className="checkmark middle" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedSauces[idx].amount === "right"}
                          onChange={() => {
                            let arrCopy = [...selectedSauces];
                            arrCopy[idx].amount = "right";
                            setSelectedSauces(arrCopy);
                          }}
                        />
                        <span className="checkmark right" />
                      </label>
                      <label
                        className={
                          selectedSauces[idx].double
                            ? "delivery-toggle option-selected"
                            : "delivery-toggle"
                        }
                      >
                        double
                        <input
                          checked={selectedSauces[idx].double}
                          onChange={() => {
                            let arrCopy = [...selectedSauces];
                            arrCopy[idx].double = !arrCopy[idx].double;
                            setSelectedSauces(arrCopy);
                          }}
                          type="checkbox"
                          name="delivery"
                          className="extra"
                        />
                      </label>
                    </>
                  )}
                </span>
              ))}
          </div>
        );

      case 2:
        return (
          <div>
            {cheeses.length &&
              cheeses.map((cheese, idx) => (
                <span className="topping" key={cheese.id}>
                  <input
                    type="checkbox"
                    value={selectedCheeses[idx].selected}
                    checked={selectedCheeses[idx].selected}
                    data-idx={idx}
                    onChange={(e) =>
                      handleCheeseSelect(e.target.getAttribute("data-idx"))
                    }
                  />
                  <label>{cheese.name}</label>
                  {selectedCheeses[idx].selected && (
                    <>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedCheeses[idx].amount === "left"}
                          onChange={() => {
                            let arrCopy = [...selectedCheeses];
                            arrCopy[idx].amount = "left";
                            setSelectedCheeses(arrCopy);
                          }}
                        />
                        <span className="checkmark left" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedCheeses[idx].amount === "full"}
                          onChange={() => {
                            let arrCopy = [...selectedCheeses];
                            arrCopy[idx].amount = "full";
                            setSelectedCheeses(arrCopy);
                          }}
                        />
                        <span className="checkmark middle" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedCheeses[idx].amount === "right"}
                          onChange={() => {
                            let arrCopy = [...selectedCheeses];
                            arrCopy[idx].amount = "right";
                            setSelectedCheeses(arrCopy);
                          }}
                        />
                        <span className="checkmark right" />
                      </label>
                      <label
                        className={
                          selectedCheeses[idx].double
                            ? "delivery-toggle option-selected"
                            : "delivery-toggle"
                        }
                      >
                        double
                        <input
                          checked={selectedCheeses[idx].double}
                          onChange={() => {
                            let arrCopy = [...selectedCheeses];
                            arrCopy[idx].double = !arrCopy[idx].double;
                            setSelectedCheeses(arrCopy);
                          }}
                          type="checkbox"
                          name="delivery"
                          className="extra"
                        />
                      </label>
                    </>
                  )}
                </span>
              ))}
          </div>
        );

      case 3:
        return (
          <div>
            {meats.length &&
              meats.map((meat, idx) => (
                <span className="topping" key={meat.id}>
                  <input
                    type="checkbox"
                    value={selectedMeats[idx].selected}
                    checked={selectedMeats[idx].selected}
                    data-idx={idx}
                    onChange={(e) =>
                      handleMeatSelect(e.target.getAttribute("data-idx"))
                    }
                  />
                  <label>{meat.name}</label>
                  {selectedMeats[idx].selected && (
                    <>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedMeats[idx].amount === "left"}
                          onChange={() => {
                            let arrCopy = [...selectedMeats];
                            arrCopy[idx].amount = "left";
                            setSelectedMeats(arrCopy);
                          }}
                        />
                        <span className="checkmark left" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedMeats[idx].amount === "full"}
                          onChange={() => {
                            let arrCopy = [...selectedMeats];
                            arrCopy[idx].amount = "full";
                            setSelectedMeats(arrCopy);
                          }}
                        />
                        <span className="checkmark middle" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedMeats[idx].amount === "right"}
                          onChange={() => {
                            let arrCopy = [...selectedMeats];
                            arrCopy[idx].amount = "right";
                            setSelectedMeats(arrCopy);
                          }}
                        />
                        <span className="checkmark right" />
                      </label>
                      <label
                        className={
                          selectedMeats[idx].double
                            ? "delivery-toggle option-selected"
                            : "delivery-toggle"
                        }
                      >
                        double
                        <input
                          checked={selectedMeats[idx].double}
                          onChange={() => {
                            let arrCopy = [...selectedMeats];
                            arrCopy[idx].double = !arrCopy[idx].double;
                            setSelectedMeats(arrCopy);
                          }}
                          type="checkbox"
                          name="delivery"
                          className="extra"
                        />
                      </label>
                    </>
                  )}
                </span>
              ))}
          </div>
        );

      case 4:
        return (
          <div>
            {vegetables.length &&
              vegetables.map((vegetable, idx) => (
                <span className="topping" key={vegetable.id}>
                  <input
                    type="checkbox"
                    value={selectedVegetables[idx].selected}
                    checked={selectedVegetables[idx].selected}
                    data-idx={idx}
                    onChange={(e) =>
                      handleVegetableSelect(e.target.getAttribute("data-idx"))
                    }
                  />
                  <label>{vegetable.name}</label>
                  {selectedVegetables[idx].selected && (
                    <>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedVegetables[idx].amount === "left"}
                          onChange={() => {
                            let arrCopy = [...selectedVegetables];
                            arrCopy[idx].amount = "left";
                            setSelectedVegetables(arrCopy);
                          }}
                        />
                        <span className="checkmark left" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedVegetables[idx].amount === "full"}
                          onChange={() => {
                            let arrCopy = [...selectedVegetables];
                            arrCopy[idx].amount = "full";
                            setSelectedVegetables(arrCopy);
                          }}
                        />
                        <span className="checkmark middle" />
                      </label>
                      <label className="position">
                        <input
                          type="checkbox"
                          checked={selectedVegetables[idx].amount === "right"}
                          onChange={() => {
                            let arrCopy = [...selectedVegetables];
                            arrCopy[idx].amount = "right";
                            setSelectedVegetables(arrCopy);
                          }}
                        />
                        <span className="checkmark right" />
                      </label>
                      <label
                        className={
                          selectedVegetables[idx].double
                            ? "delivery-toggle option-selected"
                            : "delivery-toggle"
                        }
                      >
                        double
                        <input
                          checked={selectedVegetables[idx].double}
                          onChange={() => {
                            let arrCopy = [...selectedVegetables];
                            arrCopy[idx].double = !arrCopy[idx].double;
                            setSelectedVegetables(arrCopy);
                          }}
                          type="checkbox"
                          name="delivery"
                          className="extra"
                        />
                      </label>
                    </>
                  )}
                </span>
              ))}
          </div>
        );
    }
  };

  return (
    <form className="topping-form" onSubmit={(e) => handleSubmit(e)}>
      <span className="category-selection">
        <label
          className={
            category === 1
              ? "delivery-toggle option-selected"
              : "delivery-toggle"
          }
        >
          Sauce
          <input
            checked={category === 1}
            onChange={() => setCategory(1)}
            type="radio"
            name="delivery"
          />
        </label>
        <label
          className={
            category === 2
              ? "delivery-toggle option-selected"
              : "delivery-toggle"
          }
        >
          Cheese
          <input
            checked={category === 2}
            onChange={() => setCategory(2)}
            type="radio"
            name="delivery"
          />
        </label>
        <label
          className={
            category === 3
              ? "delivery-toggle option-selected"
              : "delivery-toggle"
          }
        >
          Meat
          <input
            checked={category === 3}
            onChange={() => setCategory(3)}
            type="radio"
            name="delivery"
          />
        </label>
        <label
          className={
            category === 4
              ? "delivery-toggle option-selected"
              : "delivery-toggle"
          }
        >
          Veggies
          <input
            checked={category === 4}
            onChange={() => setCategory(4)}
            type="radio"
            name="delivery"
          />
        </label>
      </span>
      {renderToppings(category)}
      <button>Add to Order</button>
    </form>
  );
};

export default Toppings;
