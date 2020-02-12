import queryString from 'query-string';
import * as QueryParamsTypes from '../actions/queryParamsTypes';

const getQueryParams = (filtersParams, sortOrder, priceParams, essentialQueryParams) => `?${queryString.stringify({
  ...filtersParams,
  ...priceParams.essentialPriceParams,
  ...essentialQueryParams,
  ...sortOrder,
}, { arrayFormat: 'comma' })}`;

const defaultEssentialQueryParams = {
  startPage: 1,
  perPage: 10,
};

const initialState = {
  queryParams: '?perPage=10&sort=price&startPage=1',
  filtersParams: {},
  priceParams: {
    essentialPriceParams: {
      minPrice: 0,
      maxPrice: 0,
    },
    initialPriceParams: {
      initMinPrice: 0,
      initMaxPrice: 0,
    },
  },
  essentialQueryParams: {
    ...defaultEssentialQueryParams,
  },
  sortOrder: { sort: 'price' },
  loading: false,
  error: false,
};

const queryParamsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case QueryParamsTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        queryParams: getQueryParams(
          state.filtersParams,
          state.sortOrder,
          state.priceParams,
          state.essentialQueryParams,
        ),
      };
    case QueryParamsTypes.SET_FILTERS_PARAMS:
      return {
        ...state,
        filtersParams: payload,
      };
    case QueryParamsTypes.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload,
      };
    case QueryParamsTypes.REQUEST_DEFAULT_PRICE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case QueryParamsTypes.REQUESTED_DEFAULT_PRICE_SUCCEEDED:
      return {
        ...state,
        priceParams: payload,
        loading: false,
        error: false,
      };
    case QueryParamsTypes.REQUESTED_DEFAULT_PRICE_FAILED:
      return {
        ...state,
        priceParams: payload,
        loading: false,
        error: true,
      };
    case QueryParamsTypes.SET_ESSENTIAL_QUERY_PARAMS:
      return {
        ...state,
        essentialQueryParams: payload,
      };
    case QueryParamsTypes.SET_DEFAULT_ESSENTIAL_QUERY_PARAMS:
      return {
        ...state,
        essentialQueryParams: {
          ...defaultEssentialQueryParams,
        },
      };
    default:
      return state;
  }
};

export default queryParamsReducer;
