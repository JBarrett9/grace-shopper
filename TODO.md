# Capstone Project - Sauce Boss

## API

### toppings

- [x] get

> api/toppings

> api/toppings/:type

- [x] post (admin only)

> api/toppings

- [x] delete (admin only)

> api/toppings/:toppingId

- [x] patch (admin only)

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

### toppings

- [ ] Get

- [ ] Create

- [ ] Delete

- [ ] Update

### crust

- [ ] Get

- [ ] Create

- [ ] Delete

- [ ] update

### size

- [ ] Get

- [ ] Create

- [ ] Delete

- [ ] update

### pizza_toppings

- [ ] Get

- [ ] Create

- [ ] Delete

### pizza

- [ ] Get

- [ ] Create

- [ ] Delete

- [ ] Update

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

- [ ] Create

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
