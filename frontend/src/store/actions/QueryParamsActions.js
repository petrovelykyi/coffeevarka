import * as QueryParamsTypes from './queryParamsTypes';

export const setQueryParams = () => ({
  type: QueryParamsTypes.SET_QUERY_PARAMS,
});

export const setFiltersParams = (payload) => ({
  type: QueryParamsTypes.SET_FILTERS_PARAMS,
  payload,
});

export const setSortOrder = (payload) => ({
  type: QueryParamsTypes.SET_SORT_ORDER,
  payload,
});

export const requestDefaultPrice = () => ({
  type: QueryParamsTypes.REQUEST_DEFAULT_PRICE,
});

export const requestedDefaultPriceSucceeded = (payload) => ({
  type: QueryParamsTypes.REQUESTED_DEFAULT_PRICE_SUCCEEDED,
  payload,
});

export const requestedDefaultPriceFailed = (payload) => ({
  type: QueryParamsTypes.REQUESTED_DEFAULT_PRICE_FAILED,
  payload,
});

export const setEssentialQueryParams = (payload) => ({
  type: QueryParamsTypes.SET_ESSENTIAL_QUERY_PARAMS,
  payload,
});

export const setDefaultEssentialQueryParams = () => ({
  type: QueryParamsTypes.SET_DEFAULT_ESSENTIAL_QUERY_PARAMS,
});
