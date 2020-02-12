import * as SearchTypes from './searchTypes';

export const setSearchValue = (payload) => ({
  type: SearchTypes.SET_SEARCH_VALUE,
  payload,
});

export const requestedSearch = () => ({
  type: SearchTypes.REQUESTED_SEARCH,
});

export const requestedSearchSucceeded = (payload) => ({
  type: SearchTypes.REQUESTED_SEARCH_SUCCEEDED,
  payload,
});

export const requestedSearchFailed = (payload) => ({
  type: SearchTypes.REQUESTED_SEARCH_FAILED,
  payload,
});

export const clearSearchField = () => ({
  type: SearchTypes.CLEAR_SEARCH_FIELD,
});

export const setSearchSortOrder = (payload) => ({
  type: SearchTypes.SET_SEARCH_SORT_ORDER,
  payload,
});
