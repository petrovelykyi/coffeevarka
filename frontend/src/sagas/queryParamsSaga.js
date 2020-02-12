import {
  call, put, takeEvery,
} from 'redux-saga/effects';

import * as QueryParamsActions from '../store/actions/QueryParamsActions';
import * as QueryParamsTypes from '../store/actions/queryParamsTypes';

function* fetchPriceParams() {
  try {
    const data = yield call(fetch, '/api/products/filter/prices');
    const priceMinMaxParams = yield data.json();
    const allPriceParams = {
      essentialPriceParams: {
        minPrice: priceMinMaxParams.minPrice,
        maxPrice: priceMinMaxParams.maxPrice,
      },
      initialPriceParams: {
        initMinPrice: priceMinMaxParams.minPrice,
        initMaxPrice: priceMinMaxParams.maxPrice,
      },
    };
    yield put(QueryParamsActions.requestedDefaultPriceSucceeded(allPriceParams));
  } catch (e) {
    yield put(QueryParamsActions.requestedDefaultPriceFailed({
      essentialPriceParams: {
        minPrice: 0,
        maxPrice: 0,
      },
      priceParams: {
        initMinPrice: 0,
        initMaxPrice: 0,
      },
    }));
  }
}

export default function* watchFetchPriceParams() {
  yield takeEvery(QueryParamsTypes.REQUEST_DEFAULT_PRICE, fetchPriceParams);
}
