import * as FiltersTypes from '../actions/filtersTypes';

const initialState = {
  filters: [],
  loading: false,
  error: false,
};

const filtersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FiltersTypes.REQUEST_FILTERS:
      return {
        filters: [],
        loading: true,
        error: false,
      };
    case FiltersTypes.REQUESTED_FILTERS_SUCCEEDED:
      return {
        filters: payload,
        loading: false,
        error: false,
      };
    case FiltersTypes.REQUESTED_FILTERS_FAILED:
      return {
        filters: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default filtersReducer;
