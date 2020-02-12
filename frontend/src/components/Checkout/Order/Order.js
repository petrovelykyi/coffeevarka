import React from 'react';
import { useSelector } from 'react-redux';

import { MDBCard, MDBCol, MDBRow } from 'mdbreact';

import { formatPrice, getUkrDate } from '../../../helpers/helpers';

import './Order.scss';

const Order = () => {
  const {
    orderNumber,
    purchaseDate,
    payment,
    isPaid,
    error,
    errorMessage,
  } = useSelector((store) => store.orderItemsReducer);

  return (
    <MDBRow className="mb-2">
      <MDBCol>
        <h5 className="h5">
          Ваше замовлення:
        </h5>
        { error
          ? (
            <MDBCard className="p-3 mb-2 order__text">
              <span className="text-danger order__note">
                {errorMessage}
              </span>
            </MDBCard>
          )
          : (
            <MDBCard className="p-3 mb-2 order__text">
              <div className="order__sum-wrapper">
                <span>Номер:</span>
                <b>{orderNumber}</b>
              </div>
              <div className="order__sum-wrapper">
                <span>Дата:</span>
                <b>{purchaseDate && getUkrDate(purchaseDate)}</b>
              </div>
              <div className="order__sum-wrapper">
                <span>Загальна сума:</span>
                <b>
                  {`${formatPrice(payment)} грн.`}
                </b>
              </div>
              { isPaid && (
                <div className="order__sum-wrapper">
                  <span>Підтвердження оплати:</span>
                  <b>{ isPaid ? 'підтверджено' : 'не підтверджено'}</b>
                </div>
              )}
              <span className="order__note">
                На вказану вами адресу электронної пошти відправлено лист з підтвердженням
                вашого замовлення.
              </span>
            </MDBCard>
          )}
      </MDBCol>
    </MDBRow>
  );
};

export default Order;
