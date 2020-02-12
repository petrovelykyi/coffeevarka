import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
} from 'mdbreact';

import { GoogleLogin } from 'react-google-login';
import Loader from '../Loader/Loader';
import data from './client';

import { showLoginRegistration } from '../../store/actions/LoginRegistrationActions';
import { requestUserGoogle } from '../../store/actions/AuthenticationActions';

import './LoginRegistrationList.scss';

const LoginRegistrationList = () => {
  const {
    authenticationReducer,
  } = useSelector((store) => store);

  const { loading } = authenticationReducer;

  const dispatch = useDispatch();

  const showLoginRegistrationModal = () => {
    dispatch(showLoginRegistration());
  };

  const responseGoogle = (res) => {
    if (!res.error && res.tokenId) {
      dispatch(requestUserGoogle(res));
    }
  };

  return (
    loading
      ? <Loader />
      : (
        <div className="private-route__bg">
          <MDBContainer>
            <h5 className="h5 text-center mb-2">
              Увійдіть в обліковий запис:
            </h5>
            <MDBCol className="d-flex justify-content-center">
              <MDBCard className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-3">
                <MDBBtn
                  className="btn btn-amber"
                  onClick={showLoginRegistrationModal}
                >
                  <MDBIcon icon="envelope" className="pr-1" />
                  <b>Email</b>
                </MDBBtn>
                <GoogleLogin
                  render={(renderProps) => (
                    <MDBBtn
                      className="btn"
                      social="gplus"
                      onClick={renderProps.onClick}
                    >
                      <MDBIcon fab icon="google" className="pr-1" />
                      <b>Google</b>
                    </MDBBtn>
                  )}
                  clientId={data.web.client_id}
                  scope="openid profile email"
                  // onRequest={}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />

              </MDBCard>
            </MDBCol>
          </MDBContainer>
        </div>
      )
  );
};

export default LoginRegistrationList;
