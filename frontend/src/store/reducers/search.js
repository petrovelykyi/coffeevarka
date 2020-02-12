import * as SearchTypes from '../actions/searchTypes';

const initialState = {
  searchValue: '',
  searchResult: [],
  sortOrder: 'price',
  loading: false,
  error: false,
  errorMessage: '',
};

const sortSearchResult = (array, sortOrder) => array.sort((a, b) => {
  if (sortOrder === 'price') return b.price - a.price;
  if (sortOrder === '-price') return a.price - b.price;
  return null;
});

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SearchTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      };
    case SearchTypes.REQUESTED_SEARCH:
      return {
        ...state,
        loading: true,
      };
    case SearchTypes.REQUESTED_SEARCH_SUCCEEDED:
      return {
        ...state,
        searchResult: payload,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case SearchTypes.REQUESTED_SEARCH_FAILED:
      return {
        ...state,
        searchResult: [],
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case SearchTypes.CLEAR_SEARCH_FIELD:
      return {
        ...state,
        searchValue: '',
      };
    case SearchTypes.SET_SEARCH_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload,
        searchResult: sortSearchResult(state.searchResult, state.sortOrder),
      };
    default:
      return state;
  }
};

export default searchReducer;
