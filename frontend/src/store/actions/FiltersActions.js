import * as FiltersTypes from './filtersTypes';

export const requestFilters = () => ({
  type: FiltersTypes.REQUEST_FILTERS,
});

export const requestedFiltersSucceeded = (payload) => ({
  type: FiltersTypes.REQUESTED_FILTERS_SUCCEEDED,
  payload,
});

export const requestedFiltersFailed = (payload) => ({
  type: FiltersTypes.REQUESTED_FILTERS_FAILED,
  payload,
});
