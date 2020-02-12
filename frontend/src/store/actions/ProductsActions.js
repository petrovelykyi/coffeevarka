import * as ProductsTypes from './productsTypes';

export const requestProducts = () => ({
  type: ProductsTypes.REQUEST_PRODUCTS,
});

export const requestedProductsSucceeded = (payload) => ({
  type: ProductsTypes.REQUESTED_PRODUCTS_SUCCEEDED,
  payload,
});

export const requestedProductsFailed = () => ({
  type: ProductsTypes.REQUESTED_PRODUCTS_FAILED,
});
