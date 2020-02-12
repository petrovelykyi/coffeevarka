import * as OrderItemsTypes from '../actions/orderItemsTypes';

const recipient = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
};

const initialState = {
  orderItems: [],
  orderNumber: '',
  purchaseDate: '',
  recipient,
  totalAmount: 0,
  delivery: 'self',
  deliveryPayment: 50,
  paymentMethod: 'cache',
  payment: 0,
  orders: [],
  isPaid: false,
  loading: false,
  error: false,
  errorMessage: '',
};

const orderItemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OrderItemsTypes.REQUEST_ORDER_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case OrderItemsTypes.REQUESTED_ORDER_ITEMS_SUCCEEDED:
      return {
        ...state,
        orderItems: payload,
        loading: false,
        error: false,
      };
    case OrderItemsTypes.REQUESTED_ORDER_ITEMS_FAILED:
      return {
        ...state,
        orderItems: [],
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case OrderItemsTypes.SEND_ORDER_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case OrderItemsTypes.SENT_ORDER_ITEMS_SUCCEEDED:
      return {
        ...state,
        orderItems: payload,
        loading: false,
        error: false,
      };
    case OrderItemsTypes.SENT_ORDER_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case OrderItemsTypes.SET_RECIPIENT_FROM_USER_PROFILE:
      return {
        ...state,
        recipient: payload,
      };
    case OrderItemsTypes.SET_ORDER_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: payload,
      };
    case OrderItemsTypes.SET_DELIVERY_TYPE:
      return {
        ...state,
        delivery: payload,
      };
    case OrderItemsTypes.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case OrderItemsTypes.SET_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case OrderItemsTypes.SET_RECIPIENT:
      return {
        ...state,
        recipient: {
          ...state.recipient,
          ...payload,
        },
      };
    case OrderItemsTypes.SET_RECIPIENT_CITY:
      return {
        ...state,
        recipient: {
          ...state.recipient,
          city: payload,
        },
      };
    case OrderItemsTypes.SEND_ORDER:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case OrderItemsTypes.SET_ORDER_NUMBER:
      return {
        ...state,
        ...payload,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case OrderItemsTypes.CLEAR_ORDERS:
      return {
        ...state,
        orderItems: [],
        error: false,
        errorMessage: '',
      };
    case OrderItemsTypes.SET_ERROR_ON_SEND_ORDER:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: payload,
      };
    case OrderItemsTypes.SEND_PAYMENT:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case OrderItemsTypes.SET_IS_PAID:
      return {
        ...state,
        loading: false,
        isPaid: payload,
        error: false,
        errorMessage: '',
      };
    case OrderItemsTypes.SET_ERROR_ON_SEND_PAYMENT:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    case OrderItemsTypes.REQUEST_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case OrderItemsTypes.REQUESTED_ORDERS_SUCCEEDED:
      return {
        ...state,
        orders: payload,
        loading: false,
        error: false,
      };
    case OrderItemsTypes.REQUESTED_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case OrderItemsTypes.CLEAR_RECIPIENT:
      return {
        ...state,
        recipient: {
          ...recipient,
        },
      };
    default:
      return state;
  }
};

export default orderItemsReducer;
