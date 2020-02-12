import React from 'react';

import {
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBNavLink,
  MDBBtn,
} from 'mdbreact';

import './Footer.scss';

const Footer = () => (
  <MDBFooter className="footer font-small pt-4">
    <MDBContainer className="mb-0">
      <MDBRow>
        <MDBCol md="4" className="pr-0">
          <h5 className="footer__title">НАВІГАЦІЯ</h5>
          <ul className="pl-0">
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/">
                Головна
              </MDBNavLink>
            </li>
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/products/filter">
                Кавове обладнання
              </MDBNavLink>
            </li>
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/shipment">
                Доставка та оплата
              </MDBNavLink>
            </li>
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/contacts">
                Контакти
              </MDBNavLink>
            </li>
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/profile">Профіль</MDBNavLink>
            </li>
            <li className="list-unstyled">
              <MDBNavLink className="p-0" exact to="/cart">Корзина</MDBNavLink>
            </li>
          </ul>
        </MDBCol>
        <MDBCol md="4" className="pr-0">
          <h5 className="footer__title">КОНТАКТИ</h5>
          <ul className="pl-0">
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1">
                <MDBIcon icon="map-marker-alt" />
              </span>
              м.Київ, вул.Андріївська, 45
            </li>
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1">
                <MDBIcon icon="clock" />
              </span>
              Пн-Сб: з 10:00 до 20:00
            </li>
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1">
                <MDBIcon icon="phone-alt" />
              </span>
              <a href="tel:+38(067)0123456">
                +38(067)0123456
              </a>
            </li>
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1" />
              <a href="tel:+38(063)0123456">
                +38(063)0123456
              </a>
            </li>
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1">
                <MDBIcon icon="envelope" />
              </span>
              <a href="mailto:info@gmail.com">
                info@gmail.com
              </a>
            </li>
            <li className="list-unstyled">
              <span className="footer__icon-wrapper mr-1" />
              <a href="mailto:sale@gmail.com">
                sale@gmail.com
              </a>
            </li>
          </ul>
        </MDBCol>
        <MDBCol md="4" className="pr-0">
          <h5 className="footer__title">ЗВ&apos;ЯЗОК</h5>
          <ul className="footer__social pl-0">
            <li className="list-unstyled">
              <a href="https://www.facebook.com">
                <MDBBtn size="sm" floating social="fb" className="my-0 ml-0">
                  <MDBIcon fab icon="facebook-f" />
                </MDBBtn>
              </a>
            </li>
            <li className="list-unstyled">
              <a href="https://twitter.com/">
                <MDBBtn size="sm" floating social="tw" className="my-0 ml-0">
                  <MDBIcon fab icon="twitter" />
                </MDBBtn>
              </a>
            </li>
            <li className="list-unstyled">
              <a href="https://www.instagram.com/">
                <MDBBtn size="sm" floating social="ins" className="my-0 ml-0">
                  <MDBIcon fab icon="instagram" />
                </MDBBtn>
              </a>
            </li>
            <li className="list-unstyled">
              <a href="https://www.youtube.com/">
                <MDBBtn size="sm" floating social="yt" className="my-0 ml-0">
                  <MDBIcon fab icon="youtube" />
                </MDBBtn>
              </a>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="footer-copyright text-center mb-0 py-3">
      <MDBContainer>
        &copy; 2019-
        { new Date().getFullYear() }
        {' '}
        Copyright:
        {' '}
        <a href="https://coffeevarka.com">CoffeeVarka</a>
      </MDBContainer>
    </div>
  </MDBFooter>
);

export default Footer;
