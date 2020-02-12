import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import * as SearchActions from '../store/actions/SearchActions';
import * as SearchTypes from '../store/actions/searchTypes';

const selector = (state) => state;

function* requestedSearch() {
  const state = yield select(selector);
  const { searchValue } = state.searchReducer;
  const { sortOrder } = state.searchReducer;

  const res = yield call(fetch, `/api/products/search/?q=${searchValue}&sort=${sortOrder}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 200) {
    const data = yield res.json();
    yield put(SearchActions.requestedSearchSucceeded(data));
    yield put(SearchActions.clearSearchField());
  }
  if (res.status === 400) {
    const errorMessage = yield res.json();
    yield put(SearchActions.requestedSearchFailed(errorMessage));
    yield put(SearchActions.clearSearchField());
  }
}

export default function* watchRequestedSearch() {
  yield takeEvery(SearchTypes.REQUESTED_SEARCH, requestedSearch);
}
