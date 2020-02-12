import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import * as CitiesActions from '../store/actions/CitiesActions';
import * as CitiesTypes from '../store/actions/citiesTypes';

function* fetchCities() {
  try {
    const cities = yield call(fetch, '/api/cities', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(CitiesActions.requestedCitiesSucceeded(yield cities.json()));
  } catch (e) {
    yield put(CitiesActions.requestedCitiesFailed());
  }
}

export default function* watchFetchCities() {
  yield takeLatest(CitiesTypes.REQUEST_CITIES, fetchCities);
}
