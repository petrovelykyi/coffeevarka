import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import * as ProfileTypes from '../store/actions/profileTypes';
import * as ProfileActions from '../store/actions/ProfileActions';
import { showToast } from '../helpers/helpers';

function* requestUserProfile() {
  try {
    const res = yield call(fetch, '/api/users/user/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = yield res.json();
      yield put(ProfileActions.requestedUserProfileSucceeded(data));
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(ProfileActions.requestedUserProfileFailed(error.errorMessage));
      showToast('error', 'Профайл користувача не отримано!');
    }
    if (res.status === 401) {
      yield put(ProfileActions.requestedUserProfileFailed('Unauthorized!'));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestUserProfile() {
  yield takeEvery(ProfileTypes.REQUEST_USER_PROFILE, requestUserProfile);
}

// Update user profile
function* requestUpdateUserProfile() {
  try {
    const selector = (state) => state;
    const state = yield select(selector);
    const res = yield call(fetch, '/api/users/user/profile', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.profileReducer.user),
    });
    if (res.status === 200) {
      const data = yield res.json();
      yield put(ProfileActions.requestedUpdateUserProfileSucceeded(data));
      showToast('info', 'Дані успішно збережені!');
      yield put(ProfileActions.setUserDataEditMode(false));
    }
    if (res.status === 400) {
      const error = yield res.json();
      console.log(error);
      yield put(ProfileActions.requestedUpdateUserProfileFailed(error.errorMessage));
      showToast('error', error.errorMessage);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestUpdateUserProfile() {
  yield takeEvery(ProfileTypes.REQUEST_UPDATE_USER_PROFILE, requestUpdateUserProfile);
}


// Update user password
function* requestUpdatePassword() {
  try {
    const selector = (state) => state;
    const state = yield select(selector);
    const res = yield call(fetch, '/api/users/user/password', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: state.profileReducer.newPassword }),
    });
    if (res.status === 200) {
      yield put(ProfileActions.requestedUpdatePasswordSucceeded());
      showToast('info', 'Пароль успішно змінено!');
      yield put(ProfileActions.setPasswordEditMode(false));
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(ProfileActions.requestedUpdatePasswordFailed(error.errorMessage));
      showToast('error', error.errorMessage);
    }
    if (res.status === 422) {
      const error = yield res.json();
      console.log(error);
      yield put(ProfileActions.requestedUpdatePasswordFailed(error.errorMessage.msg));
      showToast('error', error.errorMessage.msg);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestUpdatePassword() {
  yield takeEvery(ProfileTypes.REQUEST_UPDATE_PASSWORD, requestUpdatePassword);
}
