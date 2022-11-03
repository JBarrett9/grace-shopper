# Capstone Project - Sauce Boss

## API

### toppings

- [ ] get

> api/toppings

> api/toppings/:type

- [ ] post (admin only)

> api/toppings

- [ ] delete (admin only)

> api/toppings/:toppingId

- [ ] patch (admin only)

> api/toppings/:toppingId

### crust

- [ ] get

> api/crusts

- [ ] post (admin only)

> api/crusts

- [ ] delete (admin only)

> api/crusts/:crustId

- [ ] patch (admin only)

> api/crusts/:crustId

### size

- [ ] get

> api/sizes

- [ ] post (admin only)

> api/sizes

- [ ] delete (admin only)

> api/sizes/:sizeId

- [ ] patch (admin only)

> api/sizes/:sizeId

### pizza_toppings

- [ ] get

> api/pizzas/featured

- [ ] post

> api/pizza_toppings

- [ ] delete

> api/pizza_toppings/:pizzaToppingId

- [ ] patch

> api/pizza_toppings/:pizzaToppingId

### Pizza

- [ ] get

> api/pizzas/:pizzaId

- [ ] post

> api/pizzas

- [ ] delete

> api/pizzas/:pizzaId

- [ ] patch

> api/pizzas/:pizzaId

### User

- [ ] get

> api/users/me

- [ ] post

> api/users/login

> api/users/register

### Cart

- [ ] get

> api/carts/:userId

- [ ] post

> api/carts/:userId

- [ ] patch

> api/carts/:userId

### Admin

- [ ] get

> api/admin/me

- [ ] post

> api/admin/login

> api/admin/register

### Errors

- [ ] 404

- [ ] 500

## DB

- [ ] Create/Drop tables tables (crust, topping, pizzabuild, user, cart)

### toppings

- [ ] Get

> getAllToppings() -> [{ topping }]

> getToppingByType(type) -> [{ topping }]

- [ ] Create

> createTopping({topping}) -> { topping }

- [ ] Delete

> deleteTopping(id) -> { topping }

- [ ] Update

> updateTopping({ id, ...fields }) -> { topping }

### crust

- [ ] Get

> getCrusts() -> [{ crust }]

- [ ] Create

> createCrust({ crust }) -> { crust }

- [ ] Delete

> deleteCrust(id) -> { crust }

- [ ] update

> updateCrust({id, ...fields}) -> { crust }

### size

- [ ] Get

> getSizes() -> [{ size }]

- [ ] Create

> createSize({ size }) -> { size }

- [ ] Delete

> deleteSize(id) -> { size }

- [ ] update

> updateSize({id, ...fields}) -> { size }

### pizza_toppings

- [ ] Get

> getFeaturedPizzas() -> [{ topping }]

> getToppingsByPizza(pizzaId) -> [{ topping }]

- [ ] Create

> addToppingToPizza({ pizza }) -> { pizza }

- [ ] Delete

> deletePizzaTopping(id) -> { topping }

### pizza

- [ ] Get

> getPizzaById(id) -> { pizza, [{ topping }], { crust }, { size } }

> getPizzasByUser(userId) -> [{ pizza, [{ topping }], { crust }, { size } }]

- [ ] Create

> createPizza({pizza}) -> { pizza, [{ topping }], { crust }, { size } }

- [ ] Delete

> deletePizza(id) -> { pizza }

- [ ] Update

> updatePizza({id, ...fields}) -> { pizza }

### cartPizza

- [ ] Get

> getPizzasByCart(cartId) -> [{ pizza }]

- [ ] Create

> addPizzaToCart({ cartPizza }) -> { cartPizza }

- [ ] Delete

> deleteCartPizza(id) -> { cartPizza }

- [ ] Update

> updateCartPizza({ id, qty }) -> { cartPizza }

### Users

- [ ] Get

> getUser(id) -> { user }

- [ ] Create

> createUser({ user }) -> { user }

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
