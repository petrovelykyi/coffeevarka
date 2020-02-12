import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MDBContainer } from 'mdbreact';

import CartItem from './ModalCart/CartItem/CartItem';
import { formatPrice } from '../../helpers/helpers';

import './Cart.scss';

const Cart = () => {
  const {
    orderItemsReducer,
  } = useSelector((store) => store);

  const {
    orderItems,
    totalAmount,
  } = orderItemsReducer;

  return (
    <div className="cart__bg">
      <MDBContainer>
        <h5 className="h5">
          Корзина
        </h5>
        <div>
          <span className="cart__name">Найменувань товарів:</span>
          {' '}
          <span className="cart__value">
            {`${orderItems.length} шт.`}
          </span>
        </div>
        <div>
          <span className="cart__name">Сума:</span>
          {' '}
          <span className="cart__value">
            {`${formatPrice(totalAmount)} грн.`}
          </span>
          <CartItem orderItems={orderItems} />
        </div>
        <div className="cart__make-order">
          <Link
            color="amber"
            className={`btn btn-amber ${orderItems.length ? '' : 'cart__disabled-link'}`}
            to="/checkout"
          >
            <b>Оформити замовлення</b>
          </Link>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Cart;
