import * as AuthenticationTypes from './authenticationTypes';

export const setUserPropsOnInput = (payload) => ({
  type: AuthenticationTypes.SET_USER_PROPS_ON_INPUT,
  payload,
});

export const registerUser = () => ({
  type: AuthenticationTypes.REGISTER_USER,
});

export const registerUserSucceeded = () => ({
  type: AuthenticationTypes.REGISTER_USER_SUCCEEDED,
});

export const registerUserFailed = (payload) => ({
  type: AuthenticationTypes.REGISTER_USER_FAILED,
  payload,
});

export const requestAuthentication = () => ({
  type: AuthenticationTypes.REQUEST_AUTHENTICATION,
});

export const requestAuthenticationSucceeded = (payload) => ({
  type: AuthenticationTypes.REQUEST_AUTHENTICATION_SUCCEEDED,
  payload,
});

export const requestAuthenticationFailed = (payload) => ({
  type: AuthenticationTypes.REQUEST_AUTHENTICATION_FAILED,
  payload,
});

export const requestLogout = () => ({
  type: AuthenticationTypes.REQUEST_LOGOUT,
});

export const requestLogoutSucceeded = () => ({
  type: AuthenticationTypes.REQUEST_LOGOUT_SUCCEEDED,
});

export const requestUserGoogle = (payload) => ({
  type: AuthenticationTypes.REQUEST_USER_GOOGLE,
  payload,
});

export const requestIsUserAuthenticated = () => ({
  type: AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED,
});

export const requestIsUserAuthenticatedSucceeded = () => ({
  type: AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED_SUCCEEDED,
});

export const requestIsUserAuthenticatedFailed = () => ({
  type: AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED_FAILED,
});

export const setAuthenticationInitialState = () => ({
  type: AuthenticationTypes.SET_AUTHENTICATION_INITIAL_STATE,
});
