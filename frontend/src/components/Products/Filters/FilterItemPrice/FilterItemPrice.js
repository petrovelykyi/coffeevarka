import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { MDBInput } from 'mdbreact';

import Slider from 'rc-slider';
import { ReactComponent as ChevronDown } from '../../../../images/catalog/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../../images/catalog/chevron-up.svg';

import 'rc-slider/assets/index.css';
import './FilterItemPrice.scss';

const FilterItemPrice = ({
  priceParams,
  requestedDefaultPriceSucceeded,
  setEssentialQueryParams,
  essentialQueryParams,
  setQueryParams,
}) => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const [state, setState] = useState({
    collapsed: false,
  });

  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setPrice({
      minPrice: priceParams.essentialPriceParams.minPrice,
      maxPrice: priceParams.essentialPriceParams.maxPrice,
    });
  }, [priceParams]);

  const toggleCollapse = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const onChangeMinPrice = (e) => {
    setPrice({
      ...price,
      minPrice: Number(e.target.value),
    });
  };

  const onBlurMinPrice = (e) => {
    if (Number(e.target.value) < Number(price.maxPrice)
      && Number(e.target.value) >= Number(priceParams.initialPriceParams.initMinPrice)) {
      const newPayload = {
        ...priceParams,
        essentialPriceParams: {
          minPrice: Number(e.target.value),
          maxPrice: price.maxPrice,
        },
      };
      dispatch(requestedDefaultPriceSucceeded(newPayload));
      dispatch(setEssentialQueryParams({
        ...essentialQueryParams,
        startPage: 1,
      }));
      dispatch(setQueryParams());
    } else {
      const newPayload = {
        ...priceParams,
      };
      dispatch(requestedDefaultPriceSucceeded(newPayload));
    }
  };

  const onChangeMaxPrice = (e) => {
    setPrice({
      ...price,
      maxPrice: Number(e.target.value),
    });
  };

  const onBlurMaxPrice = (e) => {
    if (Number(e.target.value) > Number(price.minPrice)
      && Number(e.target.value) <= Number(priceParams.initialPriceParams.initMaxPrice)) {
      const newPayload = {
        ...priceParams,
        essentialPriceParams: {
          minPrice: price.minPrice,
          maxPrice: Number(e.target.value),
        },
      };
      dispatch(requestedDefaultPriceSucceeded(newPayload));
      dispatch(setEssentialQueryParams({
        ...essentialQueryParams,
        startPage: 1,
      }));
      dispatch(setQueryParams());
    } else {
      const newPayload = {
        ...priceParams,
      };
      dispatch(requestedDefaultPriceSucceeded(newPayload));
    }
  };

  const onChangeSlider = (value) => {
    const newPayload = {
      ...priceParams,
      essentialPriceParams: {
        minPrice: value[0],
        maxPrice: value[1],
      },
    };
    dispatch(requestedDefaultPriceSucceeded(newPayload));
    dispatch(setEssentialQueryParams({
      ...essentialQueryParams,
      startPage: 1,
    }));
    dispatch(setQueryParams());
  };

  return (
    <div>
      <div className="filter__item-header">
        <h6 className="filter__item-name font-weight-bold mb-0">Ціна</h6>
        <div onClick={toggleCollapse}>
          {state.collapsed ? <ChevronDown className="filter__item-chevron mb-2" />
            : <ChevronUp className="filter__item-chevron mb-2" />}
        </div>
      </div>
      <div className={`filter__item-body ${state.collapsed ? 'collapsed' : ''}`}>
        <div className="d-flex align-items-center">
          <MDBInput
            type="number"
            size="sm"
            label="від"
            outline
            value={Number(price.minPrice)}
            onChange={(e) => onChangeMinPrice(e)}
            onBlur={(e) => onBlurMinPrice(e)}
          />
          <MDBInput
            type="number"
            size="sm"
            label="до"
            outline
            value={Number(price.maxPrice)}
            onChange={(e) => onChangeMaxPrice(e)}
            onBlur={(e) => onBlurMaxPrice(e)}
          />
          <p className="mb-0 filter-item-price__currency">грн.</p>
        </div>
        <div className="filter-item-price__range-wrapper">
          <Range
            allowCross={false}
            min={Number(priceParams.initialPriceParams.initMinPrice)}
            max={Number(priceParams.initialPriceParams.initMaxPrice)}
            defaultValue={[price.minPrice, price.maxPrice]}
            tipFormatter={(value) => `${value}грн.`}
            onAfterChange={(value) => { onChangeSlider(value); }}
          />
        </div>
      </div>
    </div>
  );
};

FilterItemPrice.propTypes = {
  priceParams: PropTypes.shape({
    essentialPriceParams: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
    }).isRequired,
    initialPriceParams: PropTypes.shape({
      initMinPrice: PropTypes.number.isRequired,
      initMaxPrice: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  requestedDefaultPriceSucceeded: PropTypes.func.isRequired,
  setQueryParams: PropTypes.func.isRequired,
  setEssentialQueryParams: PropTypes.func.isRequired,
  essentialQueryParams: PropTypes.shape({
    startPage: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
  }).isRequired,
};

export default FilterItemPrice;
