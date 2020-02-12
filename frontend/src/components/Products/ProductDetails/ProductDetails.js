import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
} from 'mdbreact';

import ModalCart from '../../Cart/ModalCart/ModalCart';
import Loader from '../../Loader/Loader';
import * as cartHandler from '../../Cart/CartHandler';
import { formatPrice } from '../../../helpers/helpers';

import { ReactComponent as ShoppingCartIcon } from '../../../images/product-item/shopping-cart2.svg';

import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    product: {},
    loading: false,
    error: false,
    errorMessage: '',
  });

  const [cart, setCart] = useState({
    modal: false,
  });

  const fetchProduct = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      const res = await fetch(`/api/products/${id}`);
      const product = await res.json();
      setState((prevState) => ({
        ...prevState,
        product,
        loading: false,
      }));
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: true,
        errorMessage: e,
      }));
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [fetchProduct]);

  const toggleCart = () => {
    setCart({
      modal: !cart.modal,
    });
  };

  const onAddToCartClick = () => {
    cartHandler.addProductToCart(state.product);
    toggleCart();
  };

  const ShowProduct = () => {
    if (Object.keys(state.product).length) {
      return (
        <>
          <MDBContainer>
            <h5 className="h5">
              {state.product.type.name.charAt(0).toUpperCase() + state.product.type.name.slice(1)}
              {' '}
              <b>{state.product.name}</b>
            </h5>
            <div className="product-details__code">
              Код товару:
              {' '}
              <b>{state.product.code}</b>
            </div>
            <MDBCard className="my-2 p-3">
              <MDBRow>
                <MDBCol md="6" sm="12" className="py-1">
                  <img
                    src={state.product.imageUrls[0]}
                    alt=""
                    className="img-fluid"
                  />
                </MDBCol>
                <MDBCol md="6" sm="12" className="py-1">
                  <div className="product-details__price">
                    <span>
                      {formatPrice(state.product.price)}
                    </span>
                    <span className="product-details__price-currency"> грн.</span>
                    <MDBBtn
                      className="product-details__buy btn btn-amber mx-0"
                      onClick={onAddToCartClick}
                    >
                      <ShoppingCartIcon />
                      <b>Придбати</b>
                    </MDBBtn>
                  </div>
                  <div>
                    <h6 className="h6 text-left">Опис:</h6>
                    <p className="product-details__overview">{state.product.overview}</p>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
          <MDBContainer>
            <h6 className="h6">Основні характеристики:</h6>
            <MDBCard className="my-2 p-3">
              <MDBRow>
                <MDBCol className="py-1">
                  <MDBTable small fixed borderless className="p-0">
                    <colgroup>
                      <col className="product-details__specification" />
                      <col />
                    </colgroup>
                    <MDBTableBody>
                      <tr>
                        <td>Виробник:</td>
                        <td>{state.product.producer.name}</td>
                      </tr>
                      <tr>
                        <td>Тип:</td>
                        <td>{state.product.type.name}</td>
                      </tr>
                      <tr>
                        <td>Спосіб встановлення:</td>
                        <td>{state.product.installation.name}</td>
                      </tr>
                      <tr>
                        <td>Потужність, Вт:</td>
                        <td>{state.product.power}</td>
                      </tr>
                      <tr>
                        <td>Тиск, бар:</td>
                        <td>{state.product.pressure || '–'}</td>
                      </tr>
                      <tr>
                        <td>Обсяг води, л:</td>
                        <td>{state.product.water_capacity}</td>
                      </tr>
                      <tr>
                        <td>Використовувана кава:</td>
                        <td>
                          {state.product.coffee_type.map((ct) => ct.name).join(', ')}
                        </td>
                      </tr>
                      <tr>
                        <td>Вага, кг:</td>
                        <td>{state.product.weight || '–'}</td>
                      </tr>
                      <tr>
                        <td>Колір:</td>
                        <td>{state.product.color}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
          <MDBContainer>
            <h6 className="h6">Оснащення:</h6>
            <MDBCard className="my-2 p-3">
              <MDBRow>
                <MDBCol className="py-1">
                  <MDBTable small fixed borderless className="p-0">
                    <colgroup>
                      <col className="product-details__specification" />
                      <col />
                    </colgroup>
                    <MDBTableBody>
                      <tr>
                        <td>Наявність млина:</td>
                        <td>{state.product.mill ? '✔' : '✘'}</td>
                      </tr>
                      <tr>
                        <td>Ступінь помелу:</td>
                        <td>{state.product.grinding_degree ? '✔' : '✘'}</td>
                      </tr>
                      <tr>
                        <td>Функція &quot;cappuccino&quot;:</td>
                        <td>{state.product.cappuccino ? '✔' : '✘'}</td>
                      </tr>
                      <tr>
                        <td>Дісплей:</td>
                        <td>{state.product.display ? '✔' : '✘'}</td>
                      </tr>
                      <tr>
                        <td>Система самоочищення:</td>
                        <td>{state.product.cleaning ? '✔' : '✘'}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
        </>
      );
    }
    return null;
  };

  return (
    <div className="product-details__bg">
      { state.loading
        ? <Loader />
        : <ShowProduct />}
      <ModalCart cart={cart} toggleCart={toggleCart} />
    </div>
  );
};

export default ProductDetails;
