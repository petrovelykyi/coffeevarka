import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import * as MessagesTypes from '../store/actions/messagesTypes';
import * as MessagesActions from '../store/actions/MessagesActions';
import { getToken, showToast } from '../helpers/helpers';

const selector = (state) => state;

// Update user password
function* sendMessage() {
  try {
    const state = yield select(selector);
    const { message } = state.messagesReducer;
    const token = yield getToken('message');
    const res = yield call(fetch, `/api/messages?token=${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (res.status === 200) {
      yield put(MessagesActions.sentMessageSucceeded());
      showToast('info', 'Повідомлення прийнято!');
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(MessagesActions.sentMessageFailed(error.errorMessage));
      showToast('error', error.errorMessage);
    }
    if (res.status === 422) {
      const error = yield res.json();
      console.log(error);
      yield put(MessagesActions.sentMessageFailed(error.errors[0]));
      showToast('error', `${error.errors[0].msg} ${error.errors[0].param}`);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchSendMessage() {
  yield takeEvery(MessagesTypes.SEND_MESSAGE, sendMessage);
}
