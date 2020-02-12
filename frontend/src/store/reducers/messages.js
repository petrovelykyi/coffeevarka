import * as MessagesTypes from '../actions/messagesTypes';

const initialState = {
  message: {
    fullName: '',
    email: '',
    subject: '',
    text: '',
  },
  loading: false,
  error: false,
  errorMessage: '',
};

const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MessagesTypes.SET_MESSAGE_FIELDS:
      return {
        ...initialState,
        message: {
          ...state.message,
          ...payload,
        },
      };
    case MessagesTypes.SEND_MESSAGE:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case MessagesTypes.SENT_MESSAGE_SUCCEEDED:
      return {
        ...initialState,
      };
    case MessagesTypes.SENT_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
