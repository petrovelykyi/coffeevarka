import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import * as ProductsActions from '../store/actions/ProductsActions';
import * as ProductsTypes from '../store/actions/productsTypes';

const selector = (state) => state;

function* fetchProducts() {
  try {
    const state = yield select(selector);
    const data = yield call(fetch, `/api/products/filter/${state.queryParamsReducer.queryParams}`);
    yield put(ProductsActions.requestedProductsSucceeded(yield data.json()));
  } catch (e) {
    yield put(ProductsActions.requestedProductsFailed());
  }
}

export default function* watchFetchProducts() {
  yield takeLatest(ProductsTypes.REQUEST_PRODUCTS, fetchProducts);
}
