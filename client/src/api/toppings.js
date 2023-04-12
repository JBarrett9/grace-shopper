const BASE_URL = "https://sauceboss-rf2u.onrender.com/api"

const fetchToppingbyId = async(toppingId, setTopping) => {
    await fetch(`${BASE_URL}/toppings/${toppingId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
            setTopping(result)
        })
        .catch(err => console.log(err));
}


const deleteToppingById = async(token, toppingId) => {
    await fetch(`${BASE_URL}/toppings/${toppingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => {
            console.log(error);
        });
};


const addTopping = async(token, fields) => {

  await fetch(`${BASE_URL}/toppings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });

}
const editTopping = async(token,toppingId, fields) => {

  await fetch(`${BASE_URL}/toppings/${toppingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });

}
export {
    deleteToppingById,
    addTopping,
    editTopping,
    fetchToppingbyId
}
