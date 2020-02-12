import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MDBBtn } from 'mdbreact';

import * as cartHandler from '../../Cart/CartHandler';
import { formatPrice } from '../../../helpers/helpers';

import {
  ReactComponent as ShoppingCartIcon,
} from '../../../images/product-item/shopping-cart2.svg';

import './ProductItem.scss';

const ProductItem = ({ product, toggleCart }) => {
  const onAddToCartClick = () => {
    cartHandler.addProductToCart(product);
    toggleCart();
  };

  return (
    <>
      <div className="product-item">
        <img
          src={product.imageUrls[0]}
          alt=""
          className="product-item__img"
        />
        <div className="product-item__description">
          <Link
            className="product-item__name"
            to={`/products/${product._id}`}
          >
            <b>{product.name}</b>
          </Link>
          <div className="my-1">
            Код товару:
            <b className="ml-1">{product.code}</b>
          </div>
          <p>
            {product.type.name.charAt(0)
              .toUpperCase()
            + product.type.name.slice(1)}
            <b> &#x2022; </b>
            {product.installation.name}
            <b> &#x2022; </b>
            використовувана кава:
            {` ${product.coffee_type.map((type) => type.name).join(', ')}`}
            <b> &#x2022; </b>
            {product.power}
            Вт
            <b> &#x2022; </b>
            {product.water_capacity}
            л
          </p>
        </div>
        <div className="product-item__pricing">
          <div className="product-item__price">
            <span>
              {formatPrice(product.price)}
            </span>
            <span className="product-item__price-currency"> грн.</span>
          </div>

          <MDBBtn
            className="btn-amber btn-sm mx-0"
            onClick={onAddToCartClick}
          >
            <ShoppingCartIcon />
          </MDBBtn>
        </div>
      </div>
      <div className="product-item__separator" />
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cappuccino: PropTypes.bool.isRequired,
    cleaning: PropTypes.bool.isRequired,
    code: PropTypes.number.isRequired,
    coffee_type: PropTypes.arrayOf(PropTypes.object),
    color: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    grinding_degree: PropTypes.bool.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    installation: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    mill: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
    pressure: PropTypes.number,
    price: PropTypes.number.isRequired,
    producer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    // quantity: PropTypes.number.isRequired,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    water_capacity: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default ProductItem;
