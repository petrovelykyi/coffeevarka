import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LoginRegistrationList from '../LoginRegistrationList/LoginRegistrationList';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    authenticationReducer,
  } = useSelector((store) => store);

  const {
    isAuthenticated,
  } = authenticationReducer;

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated
          ? <Component {...props} />
          : <LoginRegistrationList />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
