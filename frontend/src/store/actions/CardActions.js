import * as CardTypes from './cardTypes';

export const setCardFields = (payload) => ({
  type: CardTypes.SET_CARD_FIELDS,
  payload,
});
