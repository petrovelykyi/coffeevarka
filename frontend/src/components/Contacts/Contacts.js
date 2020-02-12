import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBContainer,
} from 'mdbreact';

import {
  sendMessage,
  setMessageFields,
} from '../../store/actions/MessagesActions';

import './Contacts.scss';

const Contacts = () => {
  const {
    messagesReducer,
  } = useSelector((store) => store);

  const { message, loading } = messagesReducer;

  const dispatch = useDispatch();

  const handleInputFields = (e) => {
    if (e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'textarea') {
      dispatch(setMessageFields({ [e.target.name]: e.target.value }));
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(sendMessage());
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <MDBCardBody>
              <div className="form-header blue accent-2 mb-4">
                <h3 className="m-0">
                  <MDBIcon icon="envelope" className="mr-2" />
                  Напишіть нам:
                </h3>
              </div>
              <p className="dark-grey-text text-center">
                Ми чекаємо на ваші запитання та побажання що до покращення сервісу нашого магазину
              </p>
              <form
                onSubmit={onSubmitClick}
                onChangeCapture={handleInputFields}
              >
                <div className="md-form">
                  <MDBInput
                    name="fullName"
                    outline
                    icon="user"
                    label="Імʼя та Прізвище"
                    iconClass="text-primary"
                    type="text"
                    required
                    validate
                    className="mb-3"
                    pattern="^[ a-zA-Zа-яА-ЯґҐіІїЇєЄ'`-]{2,64}$"
                    title="Enter minimum 2 letters"
                    value={message.fullName}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    name="email"
                    outline
                    icon="envelope"
                    label="Електронна пошта"
                    iconClass="text-primary"
                    type="email"
                    required
                    validate
                    className="mb-3"
                    value={message.email}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    name="subject"
                    outline
                    icon="tag"
                    label="Тема"
                    iconClass="text-primary"
                    type="text"
                    required
                    validate
                    className="mb-3"
                    value={message.subject}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    name="text"
                    outline
                    icon="pencil-alt"
                    label="Текст повідомдення"
                    iconClass="text-primary"
                    style={{ height: '200px' }}
                    type="textarea"
                    required
                    validate
                    className="mb-3"
                    value={message.text}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <MDBBtn
                    type="submit"
                    color="amber"
                    className="d-flex justify-content-center"
                  >
                    <b>Відправити</b>
                    <div className="profile__spinner-wrapper ml-1">
                      { loading
                        ? (
                          <div className="spinner-border spinner-border-sm" role="status" />
                        )
                        : <MDBIcon icon="user-check" /> }
                    </div>
                  </MDBBtn>
                </div>

              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: '420px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.842695323663!2d30.5225008332681!3d50.46265387852846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce4735d03fe9%3A0xcc83fcd2502fbd02!2sAndriivska%20St%2C%2045%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1580307163273!5m2!1sen!2sua"
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
            />
          </div>
          <br />
          <MDBRow className="text-center">
            <MDBCol md="4">
              <MDBBtn floating className="blue accent-2">
                <MDBIcon icon="map-marker-alt" />
              </MDBBtn>
              <p className="dark-grey-text mb-0">
                <b>
                  м.Київ,
                  <br />
                  вул.Андріївська, 45
                </b>
              </p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn floating className="blue accent-2">
                <MDBIcon icon="phone" />
              </MDBBtn>
              <p className="dark-grey-text mb-0">
                <b>
                  +38(067)0123456
                  <br />
                  +38(063)0123456
                  <br />
                  Пн-Сб: з 10:00 до 20:00
                </b>
              </p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn floating className="blue accent-2">
                <MDBIcon icon="envelope" />
              </MDBBtn>
              <p className="dark-grey-text mb-0">
                <b>
                  info@gmail.com
                  <br />
                  sale@gmail.com
                </b>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Contacts;
