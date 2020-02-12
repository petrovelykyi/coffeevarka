import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MDBContainer } from 'mdbreact';

import Loader from '../Loader/Loader';
import ProductItem from '../Products/ProductItem/ProductItem';
import ModalCart from '../Cart/ModalCart/ModalCart';

import { setSearchSortOrder } from '../../store/actions/SearchActions';

import './Search.scss';

const Search = () => {
  const {
    searchReducer,
  } = useSelector((store) => store);

  const {
    searchResult,
    loading,
    sortOrder,
  } = searchReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cart, setCart] = useState({
    modal: false,
  });

  const toggleCart = () => {
    setCart({
      modal: !cart.modal,
    });
  };

  const onSortChange = (e) => {
    dispatch(setSearchSortOrder(e.target.value));
  };

  return (
    <MDBContainer className="py-3 px-0">
      <div className="search__products p-2 z-depth-1">
        <div className="d-flex justify-content-start align-items-center">
          <h6 className="py-2 pl-2 mb-0 font-weight-bold">Сортування за:</h6>
          <select
            className="products-list__select-sort"
            onChange={onSortChange}
            value={sortOrder}
          >
            <option className="products-list__select-sort-option" value="price"> зростанням ціни </option>
            <option className="products-list__select-sort-option" value="-price"> зменшенням ціни </option>
          </select>
        </div>
        <div className="separator mt-1" />
        <div className="products-list__list-wrapper">
          { loading
            ? <Loader />
            : searchResult.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                toggleCart={toggleCart}
              />
            ))}
        </div>
      </div>
      <ModalCart cart={cart} toggleCart={toggleCart} />
    </MDBContainer>
  );
};

export default Search;
