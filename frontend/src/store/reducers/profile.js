import * as ProfileTypes from '../actions/profileTypes';

const initialState = {
  user: {
    username: '',
    fullName: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
  },
  newPassword: '',
  userDataEditMode: false,
  passwordEditMode: false,
  loadingUser: false,
  loadingUserUpdate: false,
  loadingPasswordUpdate: false,
  error: false,
  errorMessage: '',
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProfileTypes.REQUEST_USER_PROFILE:
      return {
        ...state,
        loadingUser: true,
      };
    case ProfileTypes.REQUESTED_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        user: payload,
        loadingUser: false,
        error: false,
        errorMessage: '',
      };
    case ProfileTypes.REQUESTED_USER_PROFILE_FAILED:
      return {
        ...state,
        loadingUser: false,
        error: true,
        errorMessage: payload,
      };
    case ProfileTypes.REQUEST_UPDATE_USER_PROFILE:
      return {
        ...state,
        loadingUserUpdate: true,
      };
    case ProfileTypes.REQUESTED_UPDATE_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        user: payload,
        loadingUserUpdate: false,
        error: false,
        errorMessage: '',
      };
    case ProfileTypes.REQUESTED_UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        loadingUserUpdate: false,
        error: true,
        errorMessage: payload,
      };
    case ProfileTypes.REQUEST_UPDATE_PASSWORD:
      return {
        ...state,
        loadingPasswordUpdate: true,
      };
    case ProfileTypes.REQUESTED_UPDATE_PASSWORD_SUCCEEDED:
      return {
        ...state,
        newPassword: '',
        loadingPasswordUpdate: false,
        error: false,
        errorMessage: '',
      };
    case ProfileTypes.REQUESTED_UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        loadingPasswordUpdate: false,
        error: true,
        errorMessage: payload,
      };
    case ProfileTypes.SET_USER_CITY:
      return {
        ...state,
        user: {
          ...state.user,
          city: payload,
        },
      };
    case ProfileTypes.SET_USER_FIELD:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case ProfileTypes.SET_USER_PASSWORD:
      return {
        ...state,
        newPassword: payload,
      };
    case ProfileTypes.SET_USER_DATA_EDIT_MODE:
      return {
        ...state,
        userDataEditMode: payload,
      };
    case ProfileTypes.SET_PASSWORD_EDIT_MODE:
      return {
        ...state,
        passwordEditMode: payload,
      };
    case ProfileTypes.SET_PROFILE_INITIAL_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default profileReducer;
