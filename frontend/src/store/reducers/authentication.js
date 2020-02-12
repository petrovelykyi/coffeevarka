import * as AuthenticationTypes from '../actions/authenticationTypes';

const initialState = {
  user: {
    username: '',
    password: '',
    confirmPassword: '',
  },
  userGoogle: {},
  isAuthenticated: false,
  isRegistered: false,
  jwt: '',
  loading: false,
  error: false,
  errorMessage: '',
};

const authenticationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthenticationTypes.SET_USER_PROPS_ON_INPUT:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case AuthenticationTypes.REGISTER_USER:
      return {
        ...state,
        loading: true,
      };
    case AuthenticationTypes.REGISTER_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        isRegistered: true,
      };
    case AuthenticationTypes.REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case AuthenticationTypes.REQUEST_AUTHENTICATION:
      return {
        ...state,
        loading: true,
      };
    case AuthenticationTypes.REQUEST_USER_GOOGLE:
      return {
        ...state,
        userGoogle: payload,
        loading: true,
      };
    case AuthenticationTypes.REQUEST_AUTHENTICATION_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: false,
        jwt: payload,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case AuthenticationTypes.REQUEST_AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        jwt: '',
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case AuthenticationTypes.REQUEST_LOGOUT:
      return {
        user: {
          ...state.user,
        },
        ...state,
        loading: true,
      };
    case AuthenticationTypes.REQUEST_LOGOUT_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: false,
        jwt: '',
        loading: false,
      };
    case AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED:
      return {
        ...state,
        loading: true,
      };
    case AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED_SUCCEEDED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case AuthenticationTypes.SET_AUTHENTICATION_INITIAL_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
