import * as CitiesTypes from './citiesTypes';

export const requestCities = () => ({
  type: CitiesTypes.REQUEST_CITIES,
});

export const requestedCitiesSucceeded = (payload) => ({
  type: CitiesTypes.REQUESTED_CITIES_SUCCEEDED,
  payload,
});

export const requestedCitiesFailed = () => ({
  type: CitiesTypes.REQUESTED_CITIES_FAILED,
});
