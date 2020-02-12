import store from '../../store';
import {
  requestedOrderItemsSucceeded,
  setOrderTotalAmount,
  sendOrderItems,
} from '../../store/actions/OrderItemsActions';

const writeCartToLocalStorage = (items) => {
  window.localStorage.setItem('cart', JSON.stringify(items));
};

const sendOrderItemsToServer = (items) => {
  store.dispatch(sendOrderItems(items));
};

export const calcTotalAmount = () => {
  const { orderItemsReducer } = store.getState();
  if (orderItemsReducer.orderItems) {
    const totalAmount = orderItemsReducer.orderItems.reduce(
      (sum, el) => sum + el.price * el.count, 0,
    );
    store.dispatch(setOrderTotalAmount(totalAmount));
  }
};

const handleOrderItems = (items) => {
  store.dispatch(requestedOrderItemsSucceeded(items));
  const { authenticationReducer } = store.getState();
  if (authenticationReducer.isAuthenticated) {
    sendOrderItemsToServer(items);
  } else {
    writeCartToLocalStorage(items);
  }
  calcTotalAmount();
};

export const addProductToCart = (product) => {
  const { orderItemsReducer } = store.getState();
  const newOrderItems = JSON.parse(JSON.stringify(orderItemsReducer.orderItems));
  const ind = newOrderItems.findIndex((el) => el._id === product._id);
  if (ind < 0) {
    const cartItem = JSON.parse(JSON.stringify(product));
    cartItem.count = 1;
    newOrderItems.push(cartItem);
  }
  handleOrderItems(newOrderItems);
};

export const deleteProductFromCart = (id) => {
  const { orderItemsReducer } = store.getState();
  const orderItemsCopy = JSON.parse(JSON.stringify(orderItemsReducer.orderItems));
  const ind = orderItemsCopy.findIndex((el) => el._id === id);
  let newOrderItems = [];
  if (ind > -1) {
    newOrderItems = orderItemsCopy.filter((el) => el._id !== id);
  }
  handleOrderItems(newOrderItems);
};

export const incItemCount = (id) => {
  const { orderItemsReducer } = store.getState();
  const newOrderItems = JSON.parse(JSON.stringify(orderItemsReducer.orderItems));
  const item = newOrderItems.find((el) => el._id === id);
  if (item) {
    item.count += 1;
  }
  handleOrderItems(newOrderItems);
};

export const decItemCount = (id) => {
  const { orderItemsReducer } = store.getState();
  const newOrderItems = JSON.parse(JSON.stringify(orderItemsReducer.orderItems));
  const item = newOrderItems.find((el) => el._id === id);
  if (item && item.count > 1) {
    item.count -= 1;
  }
  handleOrderItems(newOrderItems);
};
