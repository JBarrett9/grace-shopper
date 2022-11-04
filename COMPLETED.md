## DB

- [ ] Create/Drop tables tables (crust, topping, pizzabuild, user, cart) - DONE

### toppings

- [ ] Get

> getAllToppings() -> [{ topping }] - DONE

- [ ] Create

> createTopping({topping}) -> { topping } - DONE

- [ ] Delete

- [ ] Update

> updateTopping({ id, ...fields }) -> { topping } - DONE

### crust

- [ ] Get

> getCrusts() -> [{ crust }] - DONE

- [ ] Create

> createCrust({ crust }) -> { crust } - DONE

- [ ] Delete

> deleteCrust(id) -> { crust } - DONE

- [ ] update

> updateCrust({id, ...fields}) -> { crust } - DONE

### size

- [ ] Get

> getSizes() -> [{ size }] - DONE

- [ ] Create

> createSize({ size }) -> { size } - DONE

- [ ] Delete

> deleteSize(id) -> { size } - DONE

- [ ] update

> updateSize({id, ...fields}) -> { size } - DONE

### pizza_toppings

- [ ] Get

> getFeaturedPizzas() -> [{ topping }] - DONE

> getToppingsByPizza(pizzaId) -> [{ topping }] - DONE

- [ ] Create

> addToppingToPizza({ pizza }) -> { pizza } - DONE

- [ ] Delete

> deletePizzaTopping(id) -> { topping } - DONE

### pizza

- [ ] Get

> getPizzaById(id) -> { pizza, [{ topping }], { crust }, { size } } - DONE

> getPizzasByUser(userId) -> [{ pizza, [{ topping }], { crust }, { size } }] - DONE

- [ ] Create

> createPizza({pizza}) -> { pizza, [{ topping }], { crust }, { size } } - DONE

- [ ] Delete

> deletePizza(id) -> { pizza } - DONE

- [ ] Update

> updatePizza({id, ...fields}) -> { pizza } - DONE

### cartPizza

- [ ] Get

- [ ] Create

- [ ] Delete

- [ ] Update

### Users

- [ ] Get

> getUser(id) -> { user } - DONE

- [ ] Create

> createUser({ user }) -> { user } - DONE

### Carts

- [ ] Get

> getCart(userId) -> { cart }

### Reviews

- [ ] Get

> getReviewsByPizza(pizzaId) -> [{ review }]

> getReviewsByUser(userId) -> [{ review }]

- [ ] Create

> createReview({ review }) -> { review }

- [ ] Delete

> deleteReview(id) -> { review }

- [ ] Update

> updateReview({id, ...fields })

## Client

### User

- [ ] login
- [ ] register
- [ ] logout

### cart

- [ ] adjust quantities
- [ ] edit items
- [ ] remove items
- [ ] checkout
