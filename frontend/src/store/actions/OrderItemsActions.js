import * as OrderItemsTypes from './orderItemsTypes';

export const requestOrderItems = () => ({
  type: OrderItemsTypes.REQUEST_ORDER_ITEMS,
});

export const requestedOrderItemsSucceeded = (payload) => ({
  type: OrderItemsTypes.REQUESTED_ORDER_ITEMS_SUCCEEDED,
  payload,
});

export const requestedOrderItemsFailed = (payload) => ({
  type: OrderItemsTypes.REQUESTED_ORDER_ITEMS_FAILED,
  payload,
});

export const sendOrderItems = (payload) => ({
  type: OrderItemsTypes.SEND_ORDER_ITEMS,
  payload,
});

export const sentOrderItemsSucceeded = (payload) => ({
  type: OrderItemsTypes.SENT_ORDER_ITEMS_SUCCEEDED,
  payload,
});

export const sentOrderItemsFailed = (payload) => ({
  type: OrderItemsTypes.SENT_ORDER_ITEMS_FAILED,
  payload,
});

export const setRecipientFromUserProfile = (payload) => ({
  type: OrderItemsTypes.SET_RECIPIENT_FROM_USER_PROFILE,
  payload,
});

export const setOrderTotalAmount = (payload) => ({
  type: OrderItemsTypes.SET_ORDER_TOTAL_AMOUNT,
  payload,
});
export const setDeliveryType = (payload) => ({
  type: OrderItemsTypes.SET_DELIVERY_TYPE,
  payload,
});

export const setPaymentMethod = (payload) => ({
  type: OrderItemsTypes.SET_PAYMENT_METHOD,
  payload,
});

export const setPayment = (payload) => ({
  type: OrderItemsTypes.SET_PAYMENT,
  payload,
});

export const setRecipient = (payload) => ({
  type: OrderItemsTypes.SET_RECIPIENT,
  payload,
});

export const setRecipientCity = (payload) => ({
  type: OrderItemsTypes.SET_RECIPIENT_CITY,
  payload,
});

export const sendOrder = () => ({
  type: OrderItemsTypes.SEND_ORDER,
});

export const setOrderNumber = (payload) => ({
  type: OrderItemsTypes.SET_ORDER_NUMBER,
  payload,
});

export const clearOrders = () => ({
  type: OrderItemsTypes.CLEAR_ORDERS,
});

export const setErrorOnSendOrder = (payload) => ({
  type: OrderItemsTypes.SET_ERROR_ON_SEND_ORDER,
  payload,
});

export const sendPayment = () => ({
  type: OrderItemsTypes.SEND_PAYMENT,
});

export const setIsPaid = (payload) => ({
  type: OrderItemsTypes.SET_IS_PAID,
  payload,
});

export const gotErrorOnSendPayment = (payload) => ({
  type: OrderItemsTypes.SET_ERROR_ON_SEND_PAYMENT,
  payload,
});

export const requestOrders = () => ({
  type: OrderItemsTypes.REQUEST_ORDERS,
});

export const requestedOrdersSucceeded = (payload) => ({
  type: OrderItemsTypes.REQUESTED_ORDERS_SUCCEEDED,
  payload,
});

export const requestedOrdersFailed = (payload) => ({
  type: OrderItemsTypes.REQUESTED_ORDERS_FAILED,
  payload,
});

export const clearRecipient = () => ({
  type: OrderItemsTypes.CLEAR_RECIPIENT,
});
