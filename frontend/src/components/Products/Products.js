import React, { useEffect, useState } from 'react';

import {
  MDBBtn,
  MDBCloseIcon,
  MDBContainer,
  MDBRow,
} from 'mdbreact';

import Filters from './Filters/Filters';
import ProductList from './ProductList/ProductList';

import { ReactComponent as FilterIcon } from '../../images/catalog/filter.svg';

import './Products.scss';

const Products = () => {
  const [state, setState] = useState({
    filter: false,
  });

  const toggleFilter = () => {
    setState({
      filter: !state.filter,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="products-bg">
      <MDBContainer className="px-0">
        <MDBBtn
          className="btn-amber products-filter"
          size="sm"
          onClick={toggleFilter}
        >
          <FilterIcon className="filter-icon" />
        </MDBBtn>
        <MDBRow className="align-items-start px-3">
          <div className={`col-filter p-2 z-depth-1 ${state.filter ? 'active' : ''}`}>
            <MDBCloseIcon
              className="col-filter__btn-close"
              onClick={toggleFilter}
            />
            <h6 className="p-2 mb-0 font-weight-bold">Фільтри:</h6>
            <div className="separator mt-1" />
            <Filters />
          </div>
          <div className="col-products p-2 z-depth-1">
            <ProductList />
          </div>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Products;
