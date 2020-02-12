import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import Products from '../Products/Products';
import Search from '../Search/Search';
import ProductDetails from '../Products/ProductDetails/ProductDetails';
import Shipment from '../Shipment/Shipment';
import Contacts from '../Contacts/Contacts';
import Profile from '../Profile/Profile';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import Confirmation from '../Checkout/Confirmation/Confirmation';
import Payment from '../Checkout/Payment/Payment';
import NotFound404 from '../NotFound404/NotFound404';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route exact path="/products/filter">
      <Products />
    </Route>
    <Route exact path="/products/search">
      <Search />
    </Route>
    <Route exact path="/products/:id">
      <ProductDetails />
    </Route>
    <Route exact path="/shipment">
      <Shipment />
    </Route>
    <Route exact path="/contacts">
      <Contacts />
    </Route>
    <PrivateRoute exact path="/profile" component={Profile} />
    <Route exact path="/cart">
      <Cart />
    </Route>
    <Route exact path="/checkout">
      <Checkout />
    </Route>
    <Route exact path="/checkout/confirmation">
      <Confirmation />
    </Route>
    <Route exact path="/checkout/payment">
      <Payment />
    </Route>
    <Route path="*">
      <NotFound404 />
    </Route>
  </Switch>
);

export default Routes;
