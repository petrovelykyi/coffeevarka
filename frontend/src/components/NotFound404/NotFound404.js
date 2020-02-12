import React from 'react';
import { MDBContainer } from 'mdbreact';

import { notFound404 } from '../../images';

const NotFound404 = () => (
  <MDBContainer className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
    <h5><b>404</b></h5>
    <p>Page not found!</p>
    <img src={notFound404} className="img-fluid" alt="notFound404" />
  </MDBContainer>
);

export default NotFound404;
