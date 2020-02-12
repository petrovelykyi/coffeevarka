// Filters
import {
  call, put, takeEvery,
} from 'redux-saga/effects';

import * as FiltersActions from '../store/actions/FiltersActions';
import * as FiltersTypes from '../store/actions/filtersTypes';

function* fetchFilters() {
  try {
    const data = yield call(fetch, '/api/catalog');
    if (data.status === 200 || data.status === 204) {
      yield put(FiltersActions.requestedFiltersSucceeded(yield data.json()));
    }
  } catch (e) {
    yield put(FiltersActions.requestedFiltersFailed([]));
    console.log(e);
  }
}

export default function* watchFetchFilters() {
  yield takeEvery(FiltersTypes.REQUEST_FILTERS, fetchFilters);
}
