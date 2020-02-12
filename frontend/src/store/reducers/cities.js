import * as CitiesTypes from '../actions/citiesTypes';

const initialState = {
  cities: [],
  loading: false,
  error: false,
};

const citiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CitiesTypes.REQUEST_CITIES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CitiesTypes.REQUESTED_CITIES_SUCCEEDED:
      return {
        cities: payload,
        loading: false,
        error: false,
      };
    case CitiesTypes.REQUESTED_CITIES_FAILED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default citiesReducer;
