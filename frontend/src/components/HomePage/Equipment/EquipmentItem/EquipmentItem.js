import React from 'react';
import { MDBBtn, MDBCard } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { requestedSearch, setSearchValue } from '../../../../store/actions/SearchActions';

import './EquipmentItem.scss';

const EquipmentItem = ({ producer }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onProviderClick = (e) => {
    dispatch(setSearchValue(e.currentTarget.dataset.producer));
    dispatch(requestedSearch());
    history.push('/products/search');
  };

  return (
    <MDBCard className="hoverable m-2 equipment-item">
      <img
        className="equipment-item__img"
        src={producer.imgSrc}
        alt="provider_img"
      />
      <div className="p-3">
        <h5 className="h5-responsive equipment-item__producer-name">{producer.name}</h5>
        <div className="mb-2">
          <span>Виготовлено в </span>
          <span>{producer.country}</span>
        </div>
        <MDBBtn
          data-producer={producer.name}
          className="btn btn-amber"
          onClick={onProviderClick}
        >
          <b>Перейти</b>
        </MDBBtn>
      </div>

    </MDBCard>
  );
};

EquipmentItem.propTypes = {
  producer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired,
};

export default EquipmentItem;
