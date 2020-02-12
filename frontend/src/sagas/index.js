import { all } from 'redux-saga/effects';

import watchFetchFilters from './filtersSaga';
import watchFetchProducts from './productsSaga';
import {
  watchSendOrder,
  watchPostPayment,
  watchRequestOrderItems,
  watchSendOrderItems,
  watchRequestOrders,
} from './orderSaga';
import watchFetchPriceParams from './queryParamsSaga';
import {
  watchRegisterUser,
  watchRequestAuthentication,
  watchRequestLogout,
  watchRequestUserGoogle,
  watchRequestIsUserAuthenticated,
} from './authenticationSaga';
import watchRequestedSearch from './searchSaga';
import {
  watchRequestUserProfile,
  watchRequestUpdateUserProfile,
  watchRequestUpdatePassword,
} from './profileSaga';
import watchFetchCities from './citiesSaga';
import watchSendMessage from './messagesSaga';

export default function* rootSaga() {
  yield all([
    watchFetchFilters(),
    watchFetchProducts(),
    watchFetchPriceParams(),
    watchSendOrder(),
    watchPostPayment(),
    watchRegisterUser(),
    watchRequestAuthentication(),
    watchRequestLogout(),
    watchRequestUserGoogle(),
    watchRequestIsUserAuthenticated(),
    watchRequestedSearch(),
    watchRequestUserProfile(),
    watchRequestUpdateUserProfile(),
    watchFetchCities(),
    watchRequestUpdatePassword(),
    watchRequestOrderItems(),
    watchSendOrderItems(),
    watchRequestOrders(),
    watchSendMessage(),
  ]);
}
