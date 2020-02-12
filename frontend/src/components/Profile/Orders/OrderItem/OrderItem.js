import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCollapse,
  MDBCollapseHeader,
  MDBIcon,
} from 'mdbreact';
import PropTypes from 'prop-types';

import { getUkrDate, formatPrice } from '../../../../helpers/helpers';

import './OrderItem.scss';

const OrderItem = ({ order }) => {
  const [state, setState] = useState({
    collapseID: '',
  });

  const { collapseID } = state;

  const {
    orderNumber,
    purchaseDate,
    orderItems,
    payment,
    delivery,
    deliveryPayment,
  } = order;

  let orderItemsList = [];
  if (orderItems.length > 0) {
    orderItemsList = orderItems.map((el) => (
      <li key={el._id} className="order_item__wrapper">
        <span>{`${el.name} (${el.count}шт.)`}</span>
        <b className="order_item__sum_wrapper">
          {`${formatPrice(el.price)} грн.`}
        </b>
      </li>
    ));
  }

  const toggleCollapse = (id) => () => setState((prevState) => ({
    collapseID: prevState.collapseID !== id ? id : '',
  }));

  return (
    <MDBCard className="order_item__text my-1">
      <MDBCollapseHeader className="white" onClick={toggleCollapse('collapse4')}>
        <b className="font-small">{purchaseDate && getUkrDate(purchaseDate)}</b>
        <MDBIcon
          icon={collapseID === 'collapse4' ? 'angle-up' : 'angle-down'}
          className="dark-grey-text"
          style={{ float: 'right' }}
        />
      </MDBCollapseHeader>
      <MDBCollapse id="collapse4" isOpen={collapseID}>
        <MDBCardBody className="order_item__text">
          <div className="order_item__wrapper">
            <span>Номер замовлення:</span>
            <b>{orderNumber}</b>
          </div>
          <div className="order_item__wrapper">
            <div>Перелік товарів:</div>
          </div>
          <ul className="mb-0 pl-2">
            {orderItemsList}
          </ul>
          { delivery === 'courier'
          && (
            <div className="order_item__wrapper">
              <span>Доставка:</span>
              <b className="order_item__sum_wrapper">
                {`${formatPrice(deliveryPayment)} грн.`}
              </b>
            </div>
          )}
          <div className="order_item__wrapper">
            <span><b>Загальна сума:</b></span>
            <b className="order_item__sum_wrapper">
              {`${formatPrice(payment)} грн.`}
            </b>
          </div>
        </MDBCardBody>
      </MDBCollapse>
    </MDBCard>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired,
    purchaseDate: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ).isRequired,
    payment: PropTypes.number.isRequired,
    delivery: PropTypes.string.isRequired,
    deliveryPayment: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderItem;
