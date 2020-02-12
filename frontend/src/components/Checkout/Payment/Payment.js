import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdbreact';

import CardDummy from '../CardDummy/CardDummy';
import { formatPrice, getUkrDate } from '../../../helpers/helpers';
import Loader from '../../Loader/Loader';

import './Payment.scss';

const Payment = () => {
  const {
    orderNumber,
    purchaseDate,
    payment,
    loading,
  } = useSelector((store) => store.orderItemsReducer);

  return (
    <div className="payment__bg">
      { loading
        ? <Loader />
        : (
          <MDBContainer className="">
            <MDBRow className="mb-2">
              <MDBCol>
                <h5 className="h5">
                  Оплата замовлення:
                </h5>
                <MDBCard className="p-3 mb-3 order__text">
                  <div className="payment__sum-wrapper">
                    <span>Номер:</span>
                    <b>{orderNumber}</b>
                  </div>
                  <div className="payment__sum-wrapper">
                    <span>Дата:</span>
                    <b>{purchaseDate && getUkrDate(purchaseDate)}</b>
                  </div>
                  <div className="payment__sum-wrapper">
                    <span>Загальна сума:</span>
                    <b>
                      {`${formatPrice(payment)} грн.`}
                    </b>
                  </div>
                </MDBCard>
                <CardDummy />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
    </div>

  );
};

export default withRouter(Payment);
