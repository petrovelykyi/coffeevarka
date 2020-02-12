import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import * as AuthenticationActions from '../store/actions/AuthenticationActions';
import * as LoginRegistrationActions from '../store/actions/LoginRegistrationActions';
import * as ProfileActions from '../store/actions/ProfileActions';
import * as OrderItemsActions from '../store/actions/OrderItemsActions';
import * as AuthenticationTypes from '../store/actions/authenticationTypes';
import * as CitiesActions from '../store/actions/CitiesActions';
import { getToken, showToast } from '../helpers/helpers';

const selector = (state) => state;

// User registration
function* registerUser() {
  try {
    const state = yield select(selector);
    const token = yield getToken('registration');
    const res = yield call(fetch, `/api/users/register?token=${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.authenticationReducer.user),
    });
    if (res.status === 200) {
      yield put(AuthenticationActions.registerUserSucceeded());
      yield put(LoginRegistrationActions.hideLoginRegistration());
      yield put(AuthenticationActions.setAuthenticationInitialState());

      showToast('info', 'Щоб продовжити реєстрацію, перевірте вашу електронну пошту.');
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(AuthenticationActions.registerUserFailed(error.errorMessage));
      showToast('error', error.errorMessage);
    }
    if (res.status === 409) {
      const error = yield res.json();
      yield put(AuthenticationActions.registerUserFailed(error.errorMessage));
      showToast('error', error.errorMessage);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRegisterUser() {
  yield takeEvery(AuthenticationTypes.REGISTER_USER, registerUser);
}

// User login
function* requestAuthentication() {
  try {
    const { user } = (yield select(selector)).authenticationReducer;
    const res = yield call(fetch, '/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      const { jwt } = yield res.json();
      yield put(AuthenticationActions.requestAuthenticationSucceeded(jwt));
      yield put(ProfileActions.requestUserProfile());
      yield put(LoginRegistrationActions.hideLoginRegistration());
      window.localStorage.setItem('authenticatedBy', 'email');
      showToast('info', 'Аутентифікація успішна!');
    }
    if (res.status === 401) {
      yield put(AuthenticationActions.requestAuthenticationFailed('Помилка аутентифікації!'));
      const { errorMessage } = (yield select(selector)).authenticationReducer;
      window.localStorage.setItem('authenticatedBy', '');
      showToast('error', errorMessage);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestAuthentication() {
  yield takeEvery(AuthenticationTypes.REQUEST_AUTHENTICATION, requestAuthentication);
}


// User logout
function* requestLogout() {
  try {
    const res = yield call(fetch, '/api/users/logout');
    if (res.status === 200) {
      yield put(AuthenticationActions.requestLogoutSucceeded());
      yield put(AuthenticationActions.setAuthenticationInitialState());
      yield put(ProfileActions.setProfileInitialState());
      yield put(OrderItemsActions.clearRecipient());
      yield put(CitiesActions.requestCities());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestLogout() {
  yield takeEvery(AuthenticationTypes.REQUEST_LOGOUT, requestLogout);
}

// User Google
function* requestUserGoogle() {
  try {
    const state = yield select(selector);
    const { tokenId, profileObj } = state.authenticationReducer.userGoogle;
    const res = yield call(fetch, '/api/users/google', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId, profileObj }),
    });
    if (res.status === 200) {
      const { jwt } = yield res.json();
      yield put(AuthenticationActions.requestAuthenticationSucceeded(jwt));
      yield put(ProfileActions.requestUserProfile());
      window.localStorage.setItem('authenticatedBy', 'google');
      showToast('info', 'Реєстрація успішна!');
    }
    if (res.status >= 400) {
      const error = yield res.json();
      yield put(AuthenticationActions.requestAuthenticationFailed(error.errorMessage));
      window.localStorage.setItem('authenticatedBy', '');
      showToast('error', error.errorMessage);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestUserGoogle() {
  yield takeEvery(AuthenticationTypes.REQUEST_USER_GOOGLE, requestUserGoogle);
}

// Is user authenticated
function* requestIsUserAuthenticated() {
  const res = yield call(fetch, '/api/users/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 200) {
    yield put(AuthenticationActions.requestIsUserAuthenticatedSucceeded());
    yield put(ProfileActions.requestUserProfile());
  }
  if (res.status === 401) {
    yield put(AuthenticationActions.requestIsUserAuthenticatedFailed());
  }
}

export function* watchRequestIsUserAuthenticated() {
  yield takeEvery(AuthenticationTypes.REQUEST_IS_USER_AUTHENTICATED, requestIsUserAuthenticated);
}
