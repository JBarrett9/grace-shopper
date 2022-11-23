const deleteToppingById = async(token, toppingId) => {
    await fetch(`/api/toppings/${toppingId}`, {
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

export {
    deleteToppingById
}