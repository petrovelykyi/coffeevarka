import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from 'mdbreact';

import CartItem from './CartItem/CartItem';
import { formatPrice } from '../../../helpers/helpers';

import './ModalCart.scss';

const ModalCart = ({ cart, toggleCart }) => {
  const {
    orderItemsReducer,
  } = useSelector((store) => store);

  const { orderItems, totalAmount } = orderItemsReducer;

  return (
    <MDBModal
      isOpen={cart.modal}
      toggle={toggleCart}
      size="lg"
      centered
    >
      <MDBModalHeader
        toggle={toggleCart}
        className="primary-color white-text"
      >
        <b>Ваша корзина</b>
      </MDBModalHeader>
      <MDBModalBody className="bg-light py-2 px-3">
        <CartItem orderItems={orderItems} />
      </MDBModalBody>
      <MDBModalFooter className="py-2 modal-cart__footer">
        <div className="modal-cart__sum">
          Загальна сума товарів:
          {' '}
          <span className="modal-cart__total-amount">
            {`${formatPrice(totalAmount)} грн.`}
          </span>
        </div>
        <Link
          color="amber"
          className="btn btn-amber"
          to="/cart"
          onClick={toggleCart}
        >
          <b>До корзини</b>
        </Link>
      </MDBModalFooter>

    </MDBModal>
  );
};

ModalCart.propTypes = {
  cart: PropTypes.shape({
    modal: PropTypes.bool.isRequired,
  }).isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default ModalCart;
