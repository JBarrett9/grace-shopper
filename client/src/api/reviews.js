const fetchAllReviews = async(setReviews) => {
    await fetch("/api/reviews/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => setReviews(result))
        .catch(console.error);
}
const fetchReviewsByPizzaId = async (pizzaId, setReviews ) => {
    await fetch(`/api/reviews/${pizzaId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => setReviews(result))
        .catch(console.error);
}

const addReview = async (token, pizzaId, content, stars) => {
    await fetch(`/api/reviews/${pizzaId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          stars,
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => {
          console.log(error);
        });
}
export {
    fetchAllReviews,
    fetchReviewsByPizzaId,
    addReview,
}