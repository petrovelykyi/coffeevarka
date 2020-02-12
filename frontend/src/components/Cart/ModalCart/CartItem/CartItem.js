import React from 'react';
import PropTypes from 'prop-types';

import { MDBBtn, MDBCard, MDBNavLink } from 'mdbreact';

import { formatPrice } from '../../../../helpers/helpers';
import * as cartHandler from '../../CartHandler';

import { ReactComponent as MinusIcon } from '../../../../images/cart/minus.svg';
import { ReactComponent as PlusIcon } from '../../../../images/cart/plus.svg';
import { ReactComponent as TrashIcon } from '../../../../images/cart/trash-alt.svg';

import './CartItem.scss';

const CartItem = ({ orderItems }) => {
  const onDeleteCartItemClick = (e) => {
    const id = e.target.closest('[data-item]').dataset.item;
    cartHandler.deleteProductFromCart(id);
  };

  const onDecBtnClick = (e) => {
    const id = e.target.closest('[data-item]').dataset.item;
    cartHandler.decItemCount(id);
  };

  const onIncBtnClick = (e) => {
    const id = e.target.closest('[data-item]').dataset.item;
    cartHandler.incItemCount(id);
  };

  if (orderItems.length > 0) {
    return (
      orderItems.map((el) => (
        <MDBCard
          key={el._id}
          data-item={el._id}
          className="p-2 my-2 "
        >
          <div className="cart-item__item">
            <div className="cart-item__image-wrapper">
              <img
                src={el.imageUrls[0]}
                alt=""
                className="img-fluid cart-item__image"
              />
            </div>
            <div className="cart-item__name-wrapper">
              <MDBNavLink className="cart-item__name p-0" exact to={`/products/${el._id}`}>
                {el.name}
              </MDBNavLink>
              <p className="font-small">
                Код товару:
                {' '}
                <span className="cart-item__code">
                  {el.code}
                </span>
              </p>
              <div className="cart-item__count-wrapper">
                <MDBBtn
                  size="sm"
                  color="primary"
                  className="px-2 py-1 mt-0 mb-0"
                  onClick={(e) => onDecBtnClick(e)}
                >
                  <MinusIcon className="cart-item__icon" />
                </MDBBtn>
                <div className="d-inline cart-item__count">
                  {el.count}
                </div>
                <MDBBtn
                  size="sm"
                  color="primary"
                  className="px-2 py-1 mt-0 mb-0"
                  onClick={(e) => onIncBtnClick(e)}
                >
                  <PlusIcon className="cart-item__icon" />
                </MDBBtn>
              </div>
            </div>
            <div className="cart-item__price-wrapper">
              <div className="cart-item__price">
                {`${formatPrice(el.price)} грн.`}
              </div>
            </div>
            <div className="cart-item__btn-wrapper">
              <MDBBtn
                size="sm"
                color="danger"
                onClick={(e) => { onDeleteCartItemClick(e); }}
              >
                <TrashIcon className="cart-item__icon" />
              </MDBBtn>
            </div>
          </div>
        </MDBCard>
      ))
    );
  }
  return (
    <p className="mt-3 ml-3">
      <b>На жаль, ваша корзина порожня :-(</b>
    </p>
  );
};

CartItem.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartItem;
