import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBSelect,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import { GoogleLogout } from 'react-google-login';
import Orders from './Orders/Orders';
import Loader from '../Loader/Loader';

import {
  requestLogout,
} from '../../store/actions/AuthenticationActions';
import {
  setUserField,
  setUserCity,
  requestUpdateUserProfile,
  setUserDataEditMode,
  setPasswordEditMode,
  setUserPassword,
  requestUpdatePassword,
} from '../../store/actions/ProfileActions';
import {
  requestedOrderItemsSucceeded,
  requestOrders,
} from '../../store/actions/OrderItemsActions';

import data from '../LoginRegistrationList/client';

import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();

  const authenticatedBy = window.localStorage.getItem('authenticatedBy');

  const [passwordInput, setPasswordInput] = useState({
    iconInput: 'eye-slash',
    typeInput: 'password',
  });

  useEffect(() => {
    dispatch((requestOrders()));
    // dispatch((requestOrders()));
  }, [dispatch]);

  const {
    profileReducer,
    citiesReducer,
    orderItemsReducer,
  } = useSelector((store) => store);

  const {
    user,
    newPassword,
    userDataEditMode,
    passwordEditMode,
    loadingUser,
    loadingUserUpdate,
    loadingPasswordUpdate,
  } = profileReducer;

  const { orders } = orderItemsReducer;

  const setFlagUserDataEditMode = () => {
    if (!userDataEditMode) {
      dispatch(setUserDataEditMode(true));
    }
  };

  const setFlagPasswordEditMode = () => {
    if (!passwordEditMode) {
      dispatch(setPasswordEditMode(true));
    }
  };

  const onCityChangeClick = (value) => {
    dispatch(setUserCity(value));
    setFlagUserDataEditMode();
  };

  const handleInputUserDataFields = (e) => {
    if (e.target.type === 'text') {
      dispatch(setUserField({ [e.target.name]: e.target.value }));
      setFlagUserDataEditMode();
    }
  };

  const handleInputPasswordFields = (e) => {
    if (e.target.type === 'text' || e.target.type === 'password') {
      dispatch(setUserPassword(e.target.value));
      setFlagPasswordEditMode();
    }
  };

  const onSubmitUserDataClick = (e) => {
    e.preventDefault();
    dispatch(requestUpdateUserProfile());
  };

  const onSubmitPasswordClick = (e) => {
    e.preventDefault();
    dispatch(requestUpdatePassword());
  };

  const onNewPasswordMouseEnter = () => {
    setPasswordInput({
      iconInput: 'eye',
      typeInput: 'text',
    });
  };

  const onNewPasswordMouseLeave = () => {
    setPasswordInput({
      iconInput: 'eye-slash',
      typeInput: 'password',
    });
  };

  const onLogoutClick = () => {
    dispatch(requestLogout());
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart && cart.length) {
      dispatch(requestedOrderItemsSucceeded(cart));
    } else {
      dispatch(requestedOrderItemsSucceeded([]));
    }
  };

  const googleLogout = () => {
    onLogoutClick();
  };

  const { cities } = citiesReducer;
  if (cities.length !== 0) {
    cities.forEach((el) => {
      if (el.checked) {
        // eslint-disable-next-line no-param-reassign
        el.checked = false;
      }
      if (el.value === user.city) {
        // eslint-disable-next-line no-param-reassign
        el.checked = true;
      }
    });
  }

  return (
    loadingUser || citiesReducer.loading
      ? <Loader />
      : (
        <div className="profile__bg">
          <MDBContainer>
            <MDBRow>
              <MDBCol sm="12" lg="6" className="hidden">
                <h5 className="h5">
                  Дані користувача:
                </h5>
                <MDBCard className="text-primary p-3 mb-2">
                  <form
                    onSubmit={onSubmitUserDataClick}
                    onChangeCapture={handleInputUserDataFields}
                  >
                    <MDBInput
                      readOnly
                      name="email"
                      label="Електронна пошта"
                      icon="envelope"
                      outline
                      type="email"
                      size="sm"
                      className="mb-2"
                      value={user.username}
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
                      title="Enter phone number in format: +380#########"
                      value={user.phone}
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
                      pattern="^[ a-zA-Zа-яА-ЯґҐіІїЇєЄ'`-]{2,64}$"
                      title="Enter minimum 2 letters"
                      value={user.fullName}
                    />
                    <MDBSelect
                      outline
                      color="primary"
                      options={cities}
                      label="Місто"
                      title="Заповніть це поле для доставки товару."
                      getTextContent={onCityChangeClick}
                    />
                    <MDBInput
                      name="street"
                      label="Вулиця"
                      outline
                      type="text"
                      size="sm"
                      className="mb-1"
                      title="Заповніть це поле для доставки товару."
                      value={user.street}
                    />
                    <MDBRow>
                      <MDBCol size="6">
                        <MDBInput
                          name="house"
                          label="Дім"
                          outline
                          type="text"
                          size="sm"
                          className="mb-2"
                          title="Заповніть це поле для доставки товару."
                          value={user.house}
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
                          title="Заповніть це поле для доставки товару."
                          value={user.apartment}
                        />
                      </MDBCol>
                    </MDBRow>
                    <div className="profile__btn-wrapper">
                      <MDBBtn
                        {...(userDataEditMode ? { disabled: false } : { disabled: true })}
                        type="submit"
                        outline
                        color="amber"
                        className="d-flex justify-content-center white"
                      >
                        <b>Зберегти</b>
                        <div className="profile__spinner-wrapper ml-1">
                          { loadingUserUpdate
                            ? (
                              <div className="spinner-border spinner-border-sm" role="status" />
                            )
                            : <MDBIcon icon="user-check" /> }
                        </div>
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCard>
                <h5 className="h5">
                  Зміна паролю:
                </h5>
                <MDBCard className="text-primary p-3 mb-2">
                  <form
                    onSubmit={onSubmitPasswordClick}
                    onChangeCapture={handleInputPasswordFields}
                  >
                    <MDBInput
                      name="newPassword"
                      label="Новий пароль"
                      icon={passwordInput.iconInput}
                      type={passwordInput.typeInput}
                      outline
                      required
                      size="sm"
                      pattern="^(?=.*\d)(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*[^a-zа-яґіїєA-ZА-ЯҐІЇЄ0-9])(?!.*\s).{8,24}$"
                      title="Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol"
                      onIconMouseEnter={onNewPasswordMouseEnter}
                      onIconMouseLeave={onNewPasswordMouseLeave}
                      value={newPassword}
                    />
                    <div className="profile__btn-wrapper">
                      <MDBBtn
                        {...(passwordEditMode ? { disabled: false } : { disabled: true })}
                        type="submit"
                        outline
                        color="amber"
                        className="d-flex justify-content-center white"
                      >
                        <b>Зберегти</b>
                        <div className="profile__spinner-wrapper ml-1">
                          { loadingPasswordUpdate
                            ? (
                              <div className="spinner-border spinner-border-sm" role="status" />
                            )
                            : <MDBIcon icon="key" /> }
                        </div>
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCard>
                <div className="profile__btn-wrapper px-3">
                  { authenticatedBy === 'email'
                  && (
                    <MDBBtn
                      className="btn btn-amber"
                      onClick={onLogoutClick}
                    >
                      <b>Logout</b>
                      <MDBIcon icon="sign-out-alt" className="ml-1" />
                    </MDBBtn>
                  )}
                  { authenticatedBy === 'google'
                  && (
                    <GoogleLogout
                      clientId={data.web.client_id}
                      render={(renderProps) => (
                        <MDBBtn
                          social="gplus"
                          onClick={renderProps.onClick}
                        >
                          <b>Logout</b>
                          <MDBIcon icon="sign-out-alt" className="pl-1" />
                        </MDBBtn>
                      )}
                      onLogoutSuccess={googleLogout}
                    />
                  )}
                </div>
              </MDBCol>
              <MDBCol sm="12" lg="6" className="hidden">
                <h5 className="h5">
                  Історія покупок:
                </h5>
                <Orders orders={orders} />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )
  );
};

export default Profile;
