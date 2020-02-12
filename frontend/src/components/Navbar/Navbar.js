import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MDBBadge,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink, MDBTooltip,
  ToastContainer
} from 'mdbreact';

import LoginRegistration from '../LoginRegistration/LoginRegistration';
import * as cartHandler from '../Cart/CartHandler';
import {
  requestOrderItems,
  requestedOrderItemsSucceeded,
} from '../../store/actions/OrderItemsActions';
import {
  setSearchValue,
  requestedSearch,
} from '../../store/actions/SearchActions';
import {
  requestIsUserAuthenticated,
} from '../../store/actions/AuthenticationActions';
import { requestCities } from '../../store/actions/CitiesActions';
import { requestDefaultPrice } from '../../store/actions/QueryParamsActions';
import { requestFilters } from '../../store/actions/FiltersActions';


import { brandLogo } from '../../images';
import { ReactComponent as ShippingIcon } from '../../images/navbar/shipping-fast.svg';
import { ReactComponent as UserHeadsetIcon } from '../../images/navbar/user-headset.svg';
import { ReactComponent as UserIcon } from '../../images/navbar/user-alt.svg';
import { ReactComponent as CartIcon } from '../../images/navbar/shopping-cart.svg';

import './Navbar.scss';

const Navbar = () => {
  const {
    authenticationReducer,
    orderItemsReducer,
    searchReducer,
    profileReducer,
  } = useSelector((store) => store);

  const {
    isAuthenticated,
  } = authenticationReducer;

  const {
    user,
  } = profileReducer;

  const {
    orderItems,
  } = orderItemsReducer;

  const {
    searchValue,
  } = searchReducer;

  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    collapseID: '',
  });

  const checkCartOnLoadApp = useCallback(() => {
    if (isAuthenticated) {
      dispatch(requestOrderItems());
    } else {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      if (cart && cart.length) {
        dispatch(requestedOrderItemsSucceeded(cart));
      }
    }
    cartHandler.calcTotalAmount();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(requestIsUserAuthenticated());
    dispatch(requestDefaultPrice());
    dispatch(requestFilters());
    dispatch(requestCities());
  }, [dispatch]);

  useEffect(() => {
    checkCartOnLoadApp();
  }, [checkCartOnLoadApp]);

  const toggleCollapse = (collapseID) => () => setState((prevState) => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : '',
  }));

  const closeCollapse = (collapseID) => () => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line no-unused-expressions
    state.collapseID === collapseID && setState({ collapseID: '' });
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    if (history.location.pathname !== '/products/search') {
      history.push('/products/search');
    }
    dispatch(requestedSearch());
  };

  const onSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const onSearchBlur = () => {
    const searchTrimmedValue = searchValue.trim();
    dispatch(setSearchValue(searchTrimmedValue));
  };

  return (
    <>
      <div className="navbar-top">
        <MDBContainer className="d-flex align-items-center justify-content-around">
          <MDBNavLink className="navbar-top-brand rounded pl-2 pr-3 py-4" exact to="/">
            <img className="navbar-top-brand__img" src={brandLogo} alt="brandLogo" />
          </MDBNavLink>
          <form className="navbar-top__form" onSubmit={onSearchClick}>
            <input
              name="search"
              className="navbar-top__search"
              type="text"
              placeholder="Пошук..."
              title="Пошук за назвою, кодом або описом товару."
              required
              value={searchValue}
              onChange={onSearchChange}
              onBlur={onSearchBlur}
            />
            <button type="submit" className="navbar-top__search-submit">
              <MDBIcon icon="search white-text" />
            </button>
          </form>
          <div className="d-flex align-items-center pl-3">
            <ShippingIcon className="navbar-top__icon" />
            <p className="white-text mb-0 pl-3">
              <small>
                Швидка
                <br />
                кур&apos;єрська
                <br />
                доставка
              </small>
            </p>
          </div>
          <div className="d-flex align-items-center pl-3">
            <UserHeadsetIcon className="navbar-top__icon" />
            <p className="white-text mb-0 pl-3">
              <small>
                Телефони:
                <br />
                +38(067)0123456
                <br />
                +38(063)0123456
              </small>
            </p>
          </div>
        </MDBContainer>
      </div>
      <MDBNavbar color="black" dark expand="md" sticky="top">
        <MDBContainer>
          <MDBNavLink className="navbar-bottom-brand rounded" exact to="/">
            <img className="navbar-bottom-brand__img" src={brandLogo} alt="brandLogo" />
          </MDBNavLink>
          <MDBNavbarToggler onClick={toggleCollapse('mainNavbarCollapse')} />
          <MDBCollapse id="mainNavbarCollapse" isOpen={state.collapseID} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink
                  className="rounded font-weight-bold mdb-nav-link"
                  exact
                  to="/"
                  onClick={closeCollapse('mainNavbarCollapse')}
                >
                  Головна
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBNavLink
                  className="rounded font-weight-bold mdb-nav-link"
                  exact
                  to="/products/filter"
                  onClick={closeCollapse('mainNavbarCollapse')}
                >
                  Кавове обладнання
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBNavLink
                  className="rounded font-weight-bold mdb-nav-link"
                  to="/shipment"
                  onClick={closeCollapse('mainNavbarCollapse')}
                >
                  Доставка та оплата
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBNavLink
                  className="rounded font-weight-bold mdb-nav-link"
                  to="/contacts"
                  onClick={closeCollapse('mainNavbarCollapse')}
                >
                  Контакти
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBTooltip material placement="bottom">
                  <MDBNavLink
                    className="rounded font-weight-bold mdb-nav-link"
                    to="/profile"
                    onClick={closeCollapse('mainNavbarCollapse')}
                  >
                    <UserIcon className="navbar-bottom__icon" />
                  </MDBNavLink>
                  <div className="blue">
                    { isAuthenticated
                      ? <b>{user.fullName || user.username}</b>
                      : <b>Not logged in</b>}
                  </div>
                </MDBTooltip>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  className="rounded font-weight-bold mdb-nav-link"
                  to="/cart"
                  onClick={closeCollapse('mainNavbarCollapse')}
                >
                  <MDBBadge color="primary" className="navbar-bottom__badge">
                    {orderItems.length > 0 && orderItems.length}
                  </MDBBadge>
                  <CartIcon className="navbar-bottom__icon" />
                </MDBNavLink>
              </MDBNavItem>

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <ToastContainer
        className="navbar-bottom__toast"
        hideProgressBar={false}
        newestOnTop
        autoClose={5000}
      />
      <LoginRegistration />
    </>
  );
};

export default Navbar;
