import * as ProductsTypes from '../actions/productsTypes';

const initialState = {
  data: {
    productsCount: 0,
    products: [],
  },
  loading: false,
  error: false,
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductsTypes.REQUEST_PRODUCTS:
      return {
        data: {
          productsCount: 0,
          products: [],
        },
        loading: true,
        error: false,
      };
    case ProductsTypes.REQUESTED_PRODUCTS_SUCCEEDED:
      return {
        data: payload,
        loading: false,
        error: false,
      };
    case ProductsTypes.REQUESTED_PRODUCTS_FAILED:
      return {
        data: {
          productsCount: 0,
          products: [],
        },
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
