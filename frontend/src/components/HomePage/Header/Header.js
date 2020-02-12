import React from 'react';
import {
  MDBCarousel, MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem, MDBCol,
  MDBContainer,
  MDBMask, MDBNavLink, MDBRow,
  MDBView,
} from 'mdbreact';

import './Header.scss';

const Header = () => {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <MDBCarousel activeItem={1} length={3} showControls showIndicators className="z-depth-1">
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block header__carousel-img"
              src="/static/images/home/slider1.png"
              alt="First slide"
            />
            <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <MDBContainer>
              <MDBRow className="mb-5">
                <MDBCol md="12" className="mb-5 white-text text-center">
                  <h2 className="brand-text h1-responsive mb-5 font-weight-bolder">
                    Все починається з філіжанки гарячої кави
                  </h2>
                  <MDBNavLink
                    tag="button"
                    to="/products/filter"
                    className="btn btn-outline-amber d-inline header__btn-link"
                    onClick={scrollToTop}
                  >
                    <b>До обладнання</b>
                  </MDBNavLink>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block header__carousel-img"
              src="/static/images/home/slider2.png"
              alt="Second slide"
            />
            <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <MDBContainer>
              <MDBRow className="mb-5">
                <MDBCol md="12" className="mb-5 white-text text-center">
                  <h2 className="brand-text h1-responsive mb-5 font-weight-bolder">
                    Ми працюємо, щоб задовольнити вашу потребу у створенні ідеальної кави
                  </h2>
                  <MDBNavLink
                    tag="button"
                    to="/products/filter"
                    className="btn btn-outline-amber d-inline header__btn-link"
                    onClick={scrollToTop}
                  >
                    <b>До обладнання</b>
                  </MDBNavLink>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block header__carousel-img"
              src="/static/images/home/slider3.png"
              alt="Third slide"
            />
            <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <MDBContainer>
              <MDBRow className="mb-5">
                <MDBCol md="12" className="mb-5 white-text text-center">
                  <h2 className="brand-text h1-responsive mb-5 font-weight-bolder">
                    Насолоджуйтеся улюбленим напоєм кожен день
                  </h2>
                  <MDBNavLink
                    tag="button"
                    to="/products/filter"
                    className="btn btn-outline-amber d-inline header__btn-link"
                    onClick={scrollToTop}
                  >
                    <b>До обладнання</b>
                  </MDBNavLink>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
};

export default Header;
