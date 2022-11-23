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

  useEffect(() => {
    async function getToppings() {
      const pizza = await fetchPizza(pizzaId);
      let toppings = [];
      let toppingIds = [];
      if (pizza.toppings) {
        toppings = pizza.toppings.map((topping) => topping.toppingId);
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

      console.log(toppings);
      const meatArr = meats.map((meat) => {
        return {
          id: meat.id,
          selected: toppings.includes(meat.id),
        };
      });
      setSelectedMeats(meatArr);

      const vegArr = vegetables.map((vegetable) => ({
        id: vegetable.id,
        selected: toppings.includes(vegetable.id),
      }));
      setSelectedVegetables(vegArr);

      const cheeseArr = cheeses.map((cheese) => ({
        id: cheese.id,
        selected: toppings.includes(cheese.id),
      }));
      setSelectedCheeses(cheeseArr);

      const sauceArr = sauces.map((sauce) => ({
        id: sauce.id,
        selected: toppings.includes(sauce.id),
      }));
      setSelectedSauces(sauceArr);
    }

    getToppings();
  }, []);

  const handleMeatSelect = (idx) => {
    console.log(selectedMeats);
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
        await addToppingToPizza(props.token, pizzaId, meat.id, "full", false);
      }
    }

    for (let vegetable of selectedVegetables) {
      if (vegetable.selected) {
        await addToppingToPizza(
          props.token,
          pizzaId,
          vegetable.id,
          "full",
          false
        );
      }
    }

    for (let cheese of selectedCheeses) {
      if (cheese.selected) {
        await addToppingToPizza(props.token, pizzaId, cheese.id, "full", false);
      }
    }

    for (let sauce of selectedSauces) {
      if (sauce.selected) {
        await addToppingToPizza(props.token, pizzaId, sauce.id, "full", false);
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

  return (
    <form className="topping-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>Sauce</h3>
      {sauces.length &&
        sauces.map((sauce, idx) => (
          <span key={sauce.id}>
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
          </span>
        ))}
      <h3>Cheeses</h3>
      {cheeses.length &&
        cheeses.map((cheese, idx) => (
          <span key={cheese.id}>
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
          </span>
        ))}
      <h3>Meats</h3>
      {meats.length &&
        meats.map((meat, idx) => (
          <span key={meat.id}>
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
          </span>
        ))}
      <h3>Veggies</h3>
      {vegetables.length &&
        vegetables.map((vegetable, idx) => (
          <span key={vegetable.id}>
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
          </span>
        ))}

      <button>Add to Order</button>
    </form>
  );
};

export default Toppings;
