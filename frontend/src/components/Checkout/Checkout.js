import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBSelect,
} from 'mdbreact';

import CartItem from '../Cart/ModalCart/CartItem/CartItem';
import {
  setDeliveryType,
  setPayment,
  setPaymentMethod,
  setRecipient,
  setRecipientCity,
  sendOrder,
} from '../../store/actions/OrderItemsActions';

import { ReactComponent as CreditCard } from '../../images/cart/credit-card-front.svg';
import { ReactComponent as Wallet } from '../../images/cart/wallet.svg';
import { formatPrice } from '../../helpers/helpers';

import './Checkout.scss';

const Checkout = () => {
  const {
    authenticationReducer,
    profileReducer,
    orderItemsReducer,
    citiesReducer,
  } = useSelector((store) => store);

  const { isAuthenticated } = authenticationReducer;
  const { cities } = citiesReducer;
  const { user } = profileReducer;

  const {
    orderItems,
    totalAmount,
    delivery,
    deliveryPayment,
    paymentMethod,
    payment,
    recipient,
  } = orderItemsReducer;

  const dispatch = useDispatch();
  const history = useHistory();

  const setActualDataToCitySelect = useCallback(() => {
    const setData = (city) => {
      const cityObj = cities.find((el) => el.value === city);
      if (cityObj) {
        cityObj.checked = true;
      }
    };
    if (isAuthenticated) {
      setData(user.city);
    } else {
      setData(recipient.city);
    }
  }, [recipient.city, user.city, cities, isAuthenticated]);


  const setActualPaymentOnLoad = useCallback(() => {
    if (delivery === 'courier') {
      dispatch(setPayment(totalAmount + deliveryPayment));
    } else {
      dispatch(setPayment(totalAmount));
    }
  }, [dispatch, delivery, totalAmount, deliveryPayment]);

  useEffect(() => {
    setActualPaymentOnLoad();
  }, [setActualPaymentOnLoad]);

  useEffect(() => {
    setActualDataToCitySelect();
  }, [setActualDataToCitySelect]);

  const handleInputFields = (e) => {
    if (e.target.type === 'text' || e.target.type === 'email') {
      dispatch(setRecipient({ [e.target.name]: e.target.value }));
    }
  };

  const onSelfDeliveryClick = () => {
    dispatch(setDeliveryType('self'));
    dispatch(setPayment(totalAmount));
  };

  const onCourierDeliveryClick = () => {
    dispatch(setDeliveryType('courier'));
    dispatch(setPayment(totalAmount + deliveryPayment));
  };

  const onCachePaymentClick = () => {
    dispatch(setPaymentMethod('cache'));
  };

  const onCardPaymentClick = () => {
    dispatch(setPaymentMethod('card'));
  };

  const onCityChangeClick = (value) => {
    if (value.length !== 0) {
      dispatch(setRecipientCity(value[0]));
    } else {
      dispatch(setRecipientCity(''));
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(sendOrder());
    if (paymentMethod === 'cache') {
      history.push('/checkout/confirmation');
    } else {
      history.push('/checkout/payment');
    }
  };

  return (
    <div className="checkout__bg">
      <MDBContainer className="">
        <form
          onSubmit={onSubmitClick}
          onChangeCapture={handleInputFields}
        >
          <MDBRow>
            <MDBCol sm="12" md="12">
              <h5 className="h5">
                Корзина:
              </h5>
              <CartItem orderItems={orderItems} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12" md="6" className="hidden">
              <h5 className="h5">
                Дані одержувача:
              </h5>
              <MDBCard className="text-primary p-3 mb-2">
                <MDBInput
                  name="email"
                  label="Електронна пошта"
                  icon="envelope"
                  outline
                  type="email"
                  validate
                  required
                  size="sm"
                  className="mb-2"
                  value={isAuthenticated ? user.username : recipient.email}
                />
                <MDBInput
                  name="phone"
                  label="Телефон"
                  icon="phone"
                  outline
                  type="text"
                  required
                  validate
                  size="sm"
                  className="mb-1"
                  pattern="^(\+380)(50|66|67|98|97|96|68|39|63|93|95|99){1}[0-9]{7}$"
                  title="Enter phone number in format +380#########"
                  value={isAuthenticated ? user.phone : recipient.phone}
                />
                <MDBInput
                  name="fullName"
                  label="Імʼя та Прізвище"
                  icon="user"
                  outline
                  type="text"
                  required
                  validate
                  size="sm"
                  className="mb-1"
                  pattern="^[ a-zA-Zа-яА-ЯіІїЇєЄ'`-]{2,64}$"
                  title="Enter minimum 2 letters"
                  value={isAuthenticated ? user.fullName : recipient.fullName}
                />
              </MDBCard>
              <h5 className="h5">
                Спосіб оплати:
              </h5>
              <MDBCard className="p-3 mb-2 checkout__text-styling">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="cache"
                    name="payment"
                    required
                    checked={paymentMethod === 'cache'}
                    className="custom-control-input"
                    onChange={onCachePaymentClick}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    className="custom-control-label checkout__radio-label-wrapper"
                    htmlFor="cache"
                  >
                    <span>
                      <Wallet className="checkout__icon" />
                      готівкою при отриманні
                    </span>
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    required
                    checked={paymentMethod === 'card'}
                    className="custom-control-input"
                    onChange={onCardPaymentClick}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    className="custom-control-label checkout__radio-label-wrapper"
                    htmlFor="card"
                  >
                    <span>
                      <CreditCard className="checkout__icon" />
                      карткою
                    </span>
                  </label>
                </div>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <h5 className="h5">
                Спосіб отримання:
              </h5>
              <MDBCard className="p-3 mb-2 checkout__text-styling">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="self-delivery"
                    name="delivery"
                    required
                    checked={delivery === 'self'}
                    className="custom-control-input"
                    onChange={onSelfDeliveryClick}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    className="custom-control-label checkout__radio-label-wrapper"
                    htmlFor="self-delivery"
                  >
                    <span>самовивіз з магазину</span>
                    <b>безкоштовно</b>
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="courier"
                    name="delivery"
                    required
                    checked={delivery === 'courier'}
                    className="custom-control-input"
                    onChange={onCourierDeliveryClick}
                  />
                  <label
                    className="custom-control-label checkout__radio-label-wrapper"
                    htmlFor="courier"
                  >
                    <span>кур&apos;єром за адресою</span>
                    <b>
                      {`${formatPrice(deliveryPayment)} грн.`}
                    </b>
                  </label>
                </div>
              </MDBCard>
              { delivery === 'courier'
              && (
                <>
                  <h5 className="h5">
                    Адреса доставки:
                  </h5>
                  <MDBCard className="text-primary p-3 mb-2">
                    <MDBSelect
                      outline
                      color="primary"
                      options={cities}
                      label="Місто"
                      required
                      getValue={onCityChangeClick}
                    />
                    <MDBInput
                      name="street"
                      label="Вулиця"
                      // icon="road"
                      outline
                      type="text"
                      required
                      validate
                      size="sm"
                      className="mb-1"
                      value={isAuthenticated ? user.street : recipient.street}
                    />
                    <MDBRow>
                      <MDBCol size="6">
                        <MDBInput
                          name="house"
                          label="Дім"
                          // icon="building"
                          outline
                          type="text"
                          validate
                          required
                          size="sm"
                          className="mb-2"
                          value={isAuthenticated ? user.house : recipient.house}
                        />
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBInput
                          name="apartment"
                          label="Квартира"
                          outline
                          type="text"
                          size="sm"
                          className="mb-2"
                          value={isAuthenticated ? user.apartment : recipient.apartment}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </>
              )}
              <h5 className="h5">
                Підсумок:
              </h5>
              <MDBCard className="p-3 mb-2 checkout__text-styling">
                <div className="checkout__sum-wrapper">
                  <span>Сума товарів:</span>
                  <b>
                    {`${formatPrice(totalAmount)} грн.`}
                  </b>
                </div>
                { delivery === 'courier'
                && (
                  <div className="checkout__sum-wrapper">
                    <span>Доставка:</span>
                    <b>
                      {`${formatPrice(deliveryPayment)} грн.`}
                    </b>
                  </div>
                )}
                <div className="checkout__sum-wrapper">
                  <b>Загальна сума:</b>
                  <b>
                    {`${formatPrice(payment)} грн.`}
                  </b>
                </div>
              </MDBCard>
              <div className="text-right">
                <MDBBtn
                  type="submit"
                  color="amber"
                  className={`btn btn-amber ${orderItemsReducer.orderItems.length ? '' : 'checkout__disabled-link'}`}
                >
                  <b>Підтвердити замовлення</b>
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </div>
  );
};

export default Checkout;
