import * as CardTypes from '../actions/cardTypes';

const initialState = {
  cardNumber: '',
  expiry: '',
  cvv: '',
};

const cardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CardTypes.SET_CARD_FIELDS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default cardReducer;
