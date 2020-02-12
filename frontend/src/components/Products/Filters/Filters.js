import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FilterItem from './FilterItem/FilterItem';
import Loader from '../../Loader/Loader';
import FilterItemPrice from './FilterItemPrice/FilterItemPrice';
import {
  requestedFiltersSucceeded,
} from '../../../store/actions/FiltersActions';
import {
  setQueryParams,
  setFiltersParams,
  requestedDefaultPriceSucceeded,
  setEssentialQueryParams,
} from '../../../store/actions/QueryParamsActions';

import './Filters.scss';

const Filters = () => {
  const {
    filtersReducer,
    queryParamsReducer,
  } = useSelector((store) => store);

  const dispatch = useDispatch();

  const getChangedFilter = (event, payload) => {
    const parentFilter = payload.find((f) => f._id === event.target.dataset.parent);
    return parentFilter.children.find((c) => c._id === event.target.id);
  };

  const getQueryParamsObject = (payload) => {
    const result = {};
    payload.forEach((parentFilter) => {
      if (parentFilter.aggregator) {
        parentFilter.children.forEach((filter) => {
          if (filter.checked) {
            (result[parentFilter.filter_name]
              || (result[parentFilter.filter_name] = [])).push(filter.name);
          }
        });
      } else {
        parentFilter.children.forEach((filter) => {
          if (filter.checked) {
            result[filter.filter_name] = true;
          }
        });
      }
    });
    return result;
  };

  const { filters, loading } = filtersReducer;
  const { essentialQueryParams, priceParams } = queryParamsReducer;

  const onFilterChange = (event) => {
    const newPayload = JSON.parse(JSON.stringify(filters));
    const changedFilter = getChangedFilter(event, newPayload);
    changedFilter.checked = !changedFilter.checked;
    dispatch(requestedFiltersSucceeded(newPayload));
    const queryParamsObj = getQueryParamsObject(newPayload);
    dispatch(setFiltersParams(queryParamsObj));
    dispatch(setEssentialQueryParams({
      ...essentialQueryParams,
      startPage: 1,
    }));
    dispatch(setQueryParams());
  };

  return (
    <div className="filters-wrapper">
      { loading
        ? <Loader />
        : (
          <>
            <FilterItemPrice
              priceParams={priceParams}
              requestedDefaultPriceSucceeded={requestedDefaultPriceSucceeded}
              setEssentialQueryParams={setEssentialQueryParams}
              essentialQueryParams={essentialQueryParams}
              setQueryParams={setQueryParams}
            />
            {filters.map((item) => (
              <FilterItem key={item._id} item={item} onFilterChange={onFilterChange} />
            ))}
          </>
        )}
    </div>
  );
};

export default Filters;
