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

- [x] get

> api/crusts

- [x] post (admin only)

> api/crusts

- [x] delete (admin only)

> api/crusts/:crustId

- [x] patch (admin only)

> api/crusts/:crustId

### size

- [x] get

> api/sizes

- [x] post (admin only)

> api/sizes

- [x] delete (admin only)

> api/sizes/:sizeId

- [x] patch (admin only)

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

- [x] get

> api/pizzas/:pizzaId

- [x] post

> api/pizzas

- [x] delete

> api/pizzas/:pizzaId

- [x] patch

> api/pizzas/:pizzaId

### User

- [x] get

> api/users/me

- [x] post

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

- [x] 404

- [x] 500

## DB

### toppings

- [x] Get

- [x] Create

- [x] Delete

- [x] Update

### crust

- [x] Get

- [x] Create

- [x] Delete

- [x] update

### size

- [x] Get

- [x] Create

- [x] Delete

- [x] update

### pizza_toppings

- [x] Get

- [x] Create

- [x] Delete

### pizza

- [x] Get

- [x] Create

- [x] Delete

- [x] Update

### Orders

- [x] Get

> getPizzasByCart(cartId) -> [{ pizza }]

- [x] Create

> addPizzaToCart({ Orders }) -> { Orders }

- [x] Delete

> deleteOrders(id) -> { Orders }

- [x] Update

> updateOrders({ id, qty }) -> { Orders }

### Users

- [x] Get

- [x] Create

### Carts

- [x] Get

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
