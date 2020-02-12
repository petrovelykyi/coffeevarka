import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import * as OrderItemsActions from '../store/actions/OrderItemsActions';
import * as OrderItemsTypes from '../store/actions/orderItemsTypes';
import { copyObject } from '../helpers/helpers';
import * as cartHandler from '../components/Cart/CartHandler';

const selector = (state) => state;

// Send Order
function* sendOrder() {
  try {
    let state = yield select(selector);
    const { user } = state.profileReducer;
    const { isAuthenticated } = state.authenticationReducer;
    if (isAuthenticated) {
      const userCopy = {
        fullName: user.fullName,
        phone: user.phone,
        email: user.username,
        city: user.city,
        street: user.street,
        house: user.house,
        apartment: user.apartment,
      };
      yield put(OrderItemsActions.setRecipientFromUserProfile(userCopy));
    }
    state = yield select(selector);
    const data = copyObject(state.orderItemsReducer);
    delete data.loading;
    delete data.error;
    data.orderItems = [];
    state.orderItemsReducer.orderItems.forEach((el) => {
      data.orderItems.push({
        _id: el._id,
        name: el.name,
        code: el.code,
        price: el.price,
        count: el.count,
      });
    });
    if (state.orderItemsReducer.delivery !== 'courier') {
      data.recipient.city = '';
      data.recipient.street = '';
      data.recipient.house = '';
      data.recipient.apartment = '';
    }
    const res = yield call(fetch, '/api/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const order = yield res.json();
      yield put(OrderItemsActions.setOrderNumber({
        orderNumber: order.orderNumber,
        purchaseDate: order.purchaseDate,
      }));
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(OrderItemsActions.setErrorOnSendOrder(error.errorMessage));
    }
    if (res.status === 422) {
      const error = yield res.json();
      yield put(OrderItemsActions.setErrorOnSendOrder(error.errorMessage));
    }
  } catch (e) {
    yield put(OrderItemsActions.setOrderNumber(''));
  }
}

export function* watchSendOrder() {
  yield takeLatest(OrderItemsTypes.SEND_ORDER, sendOrder);
}

// Payment
function* sendPayment() {
  try {
    const state = yield select(selector);
    const payment = {
      cardNumber: state.cardReducer.cardNumber,
      expiry: state.cardReducer.expiry,
      cvv: state.cardReducer.cvv,
      orderNumber: state.orderItemsReducer.orderNumber,
      payment: state.orderItemsReducer.payment,

    };
    const res = yield call(fetch, '/api/payments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    if (res.status === 200) {
      const order = yield res.json();
      yield put(OrderItemsActions.setIsPaid(order.isPaid));
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(OrderItemsActions.setErrorOnSendOrder(error.errorMessage));
    }
    if (res.status === 422) {
      const error = yield res.json();
      yield put(OrderItemsActions.gotErrorOnSendPayment(error.errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchPostPayment() {
  yield takeLatest(OrderItemsTypes.SEND_PAYMENT, sendPayment);
}

// Order items
function* requestOrderItems() {
  try {
    const res = yield call(fetch, '/api/cart', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const orderItems = yield res.json();
      yield put(OrderItemsActions.requestedOrderItemsSucceeded(orderItems.orderItems));
    }
    if (res.status === 204) {
      yield put(OrderItemsActions.requestedOrderItemsSucceeded([]));
    }
    if (res.status === 500) {
      yield put(OrderItemsActions.requestedOrderItemsFailed('Error 500'));
    }
    cartHandler.calcTotalAmount();
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestOrderItems() {
  yield takeLatest(OrderItemsTypes.REQUEST_ORDER_ITEMS, requestOrderItems);
}

function* sendOrderItems() {
  try {
    const state = yield select(selector);
    const orderItems = state.orderItemsReducer;
    const res = yield call(fetch, '/api/cart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItems),
    });
    if (res.status === 200) {
      const itemsFromServer = yield res.json();
      yield put(OrderItemsActions.sentOrderItemsSucceeded(itemsFromServer.orderItems));
    }
    if (res.status === 400) {
      const error = yield res.json();
      yield put(OrderItemsActions.sentOrderItemsFailed(error.errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchSendOrderItems() {
  yield takeLatest(OrderItemsTypes.SEND_ORDER_ITEMS, sendOrderItems);
}

// Orders
function* requestOrders() {
  try {
    const res = yield call(fetch, '/api/orders', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const orders = yield res.json();
      yield put(OrderItemsActions.requestedOrdersSucceeded(orders));
    }
    if (res.status === 204) {
      yield put(OrderItemsActions.requestedOrdersSucceeded([]));
    }
    if (res.status === 500) {
      yield put(OrderItemsActions.requestedOrdersFailed('Error 500'));
    }
    cartHandler.calcTotalAmount();
  } catch (e) {
    console.log(e);
  }
}

export function* watchRequestOrders() {
  yield takeLatest(OrderItemsTypes.REQUEST_ORDERS, requestOrders);
}