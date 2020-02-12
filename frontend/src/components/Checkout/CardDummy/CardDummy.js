import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBRow,
} from 'mdbreact';

import Cleave from 'cleave.js/react';

import {
  sendPayment,
} from '../../../store/actions/OrderItemsActions';

import {
  setCardFields,
} from '../../../store/actions/CardActions';

import { cardChipSet } from '../../../images/index';
import { ReactComponent as Amex } from '../../../images/card-logos/amex.svg';
import { ReactComponent as Diner } from '../../../images/card-logos/diners.svg';
import { ReactComponent as Discover } from '../../../images/card-logos/discover.svg';
import { ReactComponent as Jcb } from '../../../images/card-logos/jcb.svg';
import { ReactComponent as Mastercard } from '../../../images/card-logos/mastercard.svg';
import { ReactComponent as Maestro } from '../../../images/card-logos/maestro.svg';
import { ReactComponent as Visa } from '../../../images/card-logos/visa.svg';

import './CardDummy.scss';

const CardDummy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [producer, setProducer] = useState({
    cardProducer: '',
  });

  const onCreditCardChanges = (event) => {
    dispatch(setCardFields({
      [event.target.name]: event.target.rawValue,
    }));
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(sendPayment());
    history.push('/checkout/confirmation');
  };

  const showCardProducer = () => {
    // 34**
    if (producer.cardProducer === 'amex') return <Amex className="card-dummy__producer" />;
    // 300*
    if (producer.cardProducer === 'diners') return <Diner className="card-dummy__producer" />;
    // 35**
    if (producer.cardProducer === 'jcb') return <Jcb className="card-dummy__producer" />;
    // 4***
    if (producer.cardProducer === 'visa') return <Visa className="card-dummy__producer" />;
    // 5(1-4)**
    if (producer.cardProducer === 'mastercard') return <Mastercard className="card-dummy__producer" />;
    // 5(6-8)**
    if (producer.cardProducer === 'maestro') return <Maestro className="card-dummy__producer" />;
    // 6011
    if (producer.cardProducer === 'discover') return <Discover className="card-dummy__producer" />;
    return null;
  };

  return (
    <form
      onSubmit={(e) => { onSubmitClick(e); }}
    >
      <div className="d-flex flex-column mb-2">
        <div>
          <small>Test card number:</small>
          <b className="mr-3">
            <small> 4242 4242 4242 4242</small>
          </b>
        </div>
        <div>
          <small>Expiry date:</small>
          <b className="mr-3">
            <small> 01/22</small>
          </b>
        </div>
        <div>
          <small>CVV:</small>
          <b className="mr-3">
            <small> 123</small>
          </b>
        </div>
      </div>
      <MDBRow className="d-flex flex-row justify-content-center mb-2">
        <MDBCard className="py-2 px-3 z-depth-3 card-dummy__card card-dummy__front-image">
          <MDBRow>
            <MDBCol className="mt-5 ml-4">
              <img
                className="card-dummy__chip-set"
                src={cardChipSet}
                alt="card-chip-set"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="d-flex justify-content-center align-items-center">
              <Cleave
                name="cardNumber"
                placeholder="#### #### #### ####"
                options={{
                  creditCard: true,
                  onCreditCardTypeChanged(type) {
                    setProducer({
                      cardProducer: type,
                    });
                  },
                }}
                onChange={onCreditCardChanges}
                className="mt-2 card-dummy__input card-dummy__input--number"
                title="Credit card number"
                required
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="d-flex justify-content-center align-items-center">
              <div className="card-dummy__valid">
                VALID THRU
              </div>
              <Cleave
                name="expiry"
                placeholder="MM/YY"
                options={{ date: true, datePattern: ['m', 'y'] }}
                // onFocus={onCreditCardFocus}
                onChange={onCreditCardChanges}
                className="card-dummy__input card-dummy__input--expiry"
                title="Expiration date"
                required
              />
              {showCardProducer()}
            </MDBCol>
          </MDBRow>
        </MDBCard>
        <MDBCard className="py-2 px-3 z-depth-3 card-dummy__card card-dummy__back-image">
          <div className="card-dummy__black-stripe" />
          <div className="card-dummy__white-stripe text-right">
            <Cleave
              name="cvv"
              placeholder="***"
              options={{ numericOnly: true, blocks: [3] }}
              onChange={onCreditCardChanges}
              className="card-dummy__input card-dummy__input--cvv"
              title="CVV code"
              required
            />
          </div>
        </MDBCard>
      </MDBRow>
      <div className="text-center">
        <MDBBtn
          type="submit"
          color="amber"
        >
          <b>Submit</b>
        </MDBBtn>
      </div>
    </form>
  );
};

export default CardDummy;
