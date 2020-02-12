import * as RecaptchaTypes from '../actions/recaptchaTypes';

const initialState = {
  siteKey: '6LdY8tMUAAAAAPFKfk3Iccbwxt-LRsA2a-IvOBj-',
  token: '',
  loading: false,
  error: false,
  errorMessage: '',
};

const recaptchaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RecaptchaTypes.REQUEST_TOKEN:
      return {
        ...initialState,
      };
    case RecaptchaTypes.REQUESTED_TOKEN_SUCCEEDED:
      return {
        ...state,
        token: payload,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case RecaptchaTypes.REQUESTED_TOKEN_FAILED:
      return {
        ...state,
        token: '',
        loading: false,
        error: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default recaptchaReducer;
