import * as LoginRegistrationTypes from '../actions/loginRegistrationTypes';

const initialState = {
  visible: false,
};

const loginRegistrationReducer = (state = initialState, { type }) => {
  switch (type) {
    case LoginRegistrationTypes.SHOW_LOGIN_REGISTRATION:
      return {
        visible: true,
      };
    case LoginRegistrationTypes.HIDE_LOGIN_REGISTRATION:
      return {
        visible: false,
      };
    default:
      return state;
  }
};

export default loginRegistrationReducer;
