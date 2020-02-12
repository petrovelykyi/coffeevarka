import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBTabContent,
  MDBTabPane,
  toast,
} from 'mdbreact';

import {
  registerUser,
  setUserPropsOnInput,
  requestAuthentication,
} from '../../store/actions/AuthenticationActions';
import {
  hideLoginRegistration,
} from '../../store/actions/LoginRegistrationActions';

import './LoginRegistration.scss';

const LoginRegistration = () => {
  const {
    authenticationReducer,
    loginRegistrationReducer,
  } = useSelector((store) => store);

  const {
    user,
    loading,
  } = authenticationReducer;

  const dispatch = useDispatch();

  const [tab, setTab] = useState({
    activeTab: '1',
  });

  const toggleTab = (value) => () => {
    if (tab.activeTab !== value) {
      setTab({
        activeTab: value,
      });
    }
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(requestAuthentication());
  };

  const onRegistrationSubmit = (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      dispatch(registerUser());
    } else {
      toast.error(
        <div className="ml-2">
          <MDBIcon icon="exclamation-triangle" className="mr-2" />
          Введені паролі не співпадають!
        </div>,
        { closeButton: false },
      );
    }
  };

  const onChangeFormInput = (e) => {
    dispatch(setUserPropsOnInput({
      [e.target.name]: e.target.value,
    }));
  };

  const hideModal = () => {
    dispatch(hideLoginRegistration());
  };

  return (
    <MDBModal
      isOpen={loginRegistrationReducer.visible}
      toggle={() => {}}
      centered
    >
      <MDBNav tabs className="md-tabs nav-justified log-reg__nav">
        <MDBNavItem>
          <MDBNavLink
            className={tab.activeTab === '1'
              ? 'log-reg__nav-link log-reg__nav-link--log actual'
              : 'log-reg__nav-link log-reg__nav-link--log'}
            to="#"
            onClick={toggleTab('1')}
          >
            <MDBIcon icon="user" className="mr-1" />
            Вхід
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            className={tab.activeTab === '2'
              ? 'log-reg__nav-link log-reg__nav-link--reg actual'
              : 'log-reg__nav-link log-reg__nav-link--reg'}
            to="#"
            onClick={toggleTab('2')}
          >
            <MDBIcon icon="user-plus" className="mr-1" />
            Реєстрація
          </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={tab.activeTab} className="px-3 py-4">
        <MDBTabPane tabId="1">
          <form
            className="mx-3 grey-text"
            onChangeCapture={(e) => onChangeFormInput(e)}
            onSubmit={(e) => onLoginSubmit(e)}
          >
            <div className="">
              <MDBInput
                name="username"
                className="mb-3"
                label="Your email"
                icon="envelope"
                outline
                type="email"
                validate
                required
                value={user.username}
              />
              <MDBInput
                name="password"
                className="mb-3"
                label="Your password"
                icon="lock"
                outline
                type="password"
                required
                validate
                value={user.password}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,24}$"
                title="Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol"
              />
            </div>
            <div className="pt-2" style={{ borderTop: '1px solid #dee2e6' }}>
              <MDBRow className="px-3">
                <p
                  className="mb-1 log-reg__text-styling"
                  onClick={() => {
                    console.log('forget password');
                  }}
                >
                  Забули пароль?
                </p>
              </MDBRow>
              <MDBRow
                className="log-reg__btn-wrapper"
              >
                <MDBBtn outline color="amber" onClick={hideModal}>
                  <b>Закрити</b>
                </MDBBtn>
                <MDBBtn type="submit" color="amber" className="btn d-flex justify-content-center">
                  <b>Увійти</b>
                  <div className="log-reg__spiner-wrapper ml-1">
                    { loading
                      ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      )
                      : <MDBIcon icon="sign-in-alt" className="" /> }
                  </div>
                </MDBBtn>
              </MDBRow>
            </div>
          </form>
        </MDBTabPane>
        <MDBTabPane tabId="2">
          <form
            className="mx-3 grey-text"
            onChangeCapture={(e) => onChangeFormInput(e)}
            onSubmit={(e) => onRegistrationSubmit(e)}
          >
            <div className="">
              <MDBInput
                name="username"
                className="mb-3"
                label="Your email"
                icon="envelope"
                outline
                type="email"
                validate
                required
                value={user.username}
              />
              <MDBInput
                name="password"
                className="mb-3"
                label="Your password"
                icon="lock"
                outline
                type="password"
                required
                validate
                value={user.password}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,24}$"
                title="Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol"
              />
              <MDBInput
                name="confirmPassword"
                className="mb-3"
                label="Repeat password"
                icon="lock"
                outline
                type="password"
                required
                validate
                value={user.confirmPassword}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,24}$"
                title="Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol"
              />
            </div>
            <div className="pt-2" style={{ borderTop: '1px solid #dee2e6' }}>
              <MDBRow className="px-3">
                <p
                  className="mb-1 log-reg__text-styling"
                  onClick={toggleTab('1')}
                >
                  Вже зареєстровані?
                </p>
              </MDBRow>
              <MDBRow className="log-reg__btn-wrapper">
                <MDBBtn outline color="amber" onClick={hideModal}>
                  <b>Закрити</b>
                </MDBBtn>
                <MDBBtn type="submit" color="amber" className="btn d-flex justify-content-center">
                  <b>Зареєструватись</b>
                  <div className="log-reg__spiner-wrapper ml-1">
                    { loading
                      ? (
                        <div className="spinner-border spinner-border-sm" role="status" />
                      )
                      : <MDBIcon icon="edit" className="" /> }
                  </div>
                </MDBBtn>
              </MDBRow>
            </div>
          </form>
        </MDBTabPane>
      </MDBTabContent>
    </MDBModal>
  );
};

export default LoginRegistration;
