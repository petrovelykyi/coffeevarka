import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalCart from '../../Cart/ModalCart/ModalCart';

import Loader from '../../Loader/Loader';
import ProductItem from '../ProductItem/ProductItem';
import { requestProducts } from '../../../store/actions/ProductsActions';
import {
  setSortOrder,
  setQueryParams,
  setEssentialQueryParams,
} from '../../../store/actions/QueryParamsActions';

import './ProductList.scss';

const ProductList = () => {
  const {
    productsReducer,
    queryParamsReducer,
  } = useSelector((store) => store);

  const { loading } = productsReducer;
  const { products, productsCount } = productsReducer.data;
  const { startPage, perPage } = queryParamsReducer.essentialQueryParams;

  const dispatch = useDispatch();

  const [state, setState] = useState({
    sortOrder: 'price',
    activePage: 1,
  });

  const [cart, setCart] = useState({
    modal: false,
  });

  useEffect(() => {
    dispatch(requestProducts());
    setState((prevState) => ({
      ...prevState,
      activePage: startPage,
    }));
  }, [dispatch, queryParamsReducer.queryParams, startPage]);

  const toggleCart = () => {
    setCart({
      modal: !cart.modal,
    });
  };

  const onSortChange = (event) => {
    setState({
      ...state,
      sortOrder: event.target.value,
    });
    dispatch(setSortOrder({ sort: event.target.value }));
    dispatch(setQueryParams());
  };

  const handleChangingPageNumber = (pageNumber) => {
    setState({
      ...state,
      activePage: pageNumber,
    });
    dispatch(setEssentialQueryParams({
      ...queryParamsReducer.essentialQueryParams,
      startPage: pageNumber,
    }));
    dispatch(setQueryParams());
  };

  const onPrevPageClick = () => {
    handleChangingPageNumber(state.activePage - 1);
  };

  const onNextPageClick = () => {
    handleChangingPageNumber(state.activePage + 1);
  };

  const onPageNumberClick = (e) => {
    handleChangingPageNumber(Number(e.target.dataset.id));
  };

  const Pagination = () => {
    if (productsCount / perPage > 0) {
      const PagesNumbers = [];
      const countPages = productsCount / perPage + 1;
      for (let i = 1; i < countPages; i += 1) {
        PagesNumbers.push(
          <div
            key={i}
            className={`pagination__page btn-sm hoverable ${i === state.activePage ? 'btn-amber' : 'btn-light'}`}
            role="presentation"
            data-id={i}
            onClick={(e) => onPageNumberClick(e)}
          >
            {i}
          </div>,
        );
      }

      return (
        <div className="d-flex my-2 ml-1">
          <div
            role="presentation"
            onClick={onPrevPageClick}
            className={`pagination__arrow btn-light btn-sm hoverable ${startPage === 1 ? 'disabled' : ''}`}
          >
            &laquo;
          </div>
          {PagesNumbers}
          <div
            role="presentation"
            onClick={onNextPageClick}
            className={`pagination__arrow btn-light btn-sm hoverable ${startPage * perPage >= productsCount ? 'disabled' : ''}`}
          >
            &raquo;
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-start align-items-center">
          <h6 className="py-2 pl-2 mb-0 font-weight-bold">Сортування за:</h6>
          <select
            onChange={(event) => onSortChange(event)}
            className="products-list__select-sort"
            value={state.sortOrder}
          >
            <option className="products-list__select-sort-option" value="price"> зростанням ціни </option>
            <option className="products-list__select-sort-option" value="-price"> зменшенням ціни </option>
          </select>
        </div>
        <div className="separator mt-1" />
        <div className="products-list__list-wrapper">
          { loading
            ? <Loader />
            : products.map((product) => (
              <ProductItem key={product._id} product={product} toggleCart={toggleCart} />
            ))}
        </div>
        <Pagination />
      </div>
      <ModalCart cart={cart} toggleCart={toggleCart} />
    </>
  );
};

export default ProductList;
