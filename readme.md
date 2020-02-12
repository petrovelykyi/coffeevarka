# Final project

## Task description:

Create an e-commerce web shop storefront with limited functionality. Store should have at least 20 relevant products and 5 separate categories. Subject area is for your choice. User should be able to:
- Browse a catalog of products, search via products
- See detailed information about the product
- Add product to cart, remove, change quantity, place order.
- Login to my account, change user information, review placed orders

#####1. Server Side

Create shop API REST service based on node.js, express, and any database. Service
should have ability to store and retrieve products information from the database, register new
and login existing customers. Service should provide basket instance for user shopping cart.
When user finalizes the order, basket should be converted into an order.

#####2. Client Side

Client side should be written using React.JS and Redux.

Create a set of the e-shop pages:
- Homepage​:
    - Page should have slider with news and promotions. Navigation and search suggestions should be available for each site page except checkout.
- Product list page:
    - Page opens to review category products or products search result.
- Product details page:
    - Page with detailed product information and ability to add product to cart.
- Login Page​:
    - Page where user can login or register new account.
- My account Page:
    - Account section with subpages. Should be developed as a single page application (SPA). My account consist of customer info page and order history page. On order history page should be an ability to review single order information. On customer info page user can edit personal information.
- Cart Page:
    - Page with products added to basket. Should be an ability to change product quantity and remove product from cart.
- Checkout:
    - User should be able to place order with added products to basket as a guest or registered user. During checkout user should populate shipping address information.    

## Get Started

1. Clone this repository
2. Run `npm install` inside its root folder.
3. Change folder `cd frontend`
4. Run `npm install` inside `frontend` folder.
5. Make settings in files `.env`, `/frontend/.env.development,` and `/frontend/.env.production`
6. Run `concurrently "npm run backend-start" "npm run frontend-build"` for building app.
7. Run `concurrently "npm run backend-dev" "npm run frontend-start"` for developing app.

## Team:

 - Petro Velykyi
 - Iana Keukh

### [Demo](https://coffeevarka.herokuapp.com)

