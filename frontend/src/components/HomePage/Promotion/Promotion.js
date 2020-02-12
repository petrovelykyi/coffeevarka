import React from 'react';
import { MDBContainer } from 'mdbreact';

import './Promotion.scss';

const Promotion = () => (
  <div className="card-image">
    <div className="text-white text-center rgba-stylish-strong py-5 px-2">
      <MDBContainer className="py-5">
        <h2 className="font-weight-bolder">НАЙКРАЩЕ ДЛЯ ТВОГО ЗАДОВОЛЕННЯ</h2>
        <p className="font-weight-bolder">
          Саме від характеристик каковарки залежить її смак. В нашому магазині ви знайдете
          саме те, що вам потрібно: широкий вибір каковарок та постійні нові надходження.
        </p>
      </MDBContainer>
    </div>
  </div>
);

export default Promotion;
