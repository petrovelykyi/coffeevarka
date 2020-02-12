import React from 'react';
import { useSelector } from 'react-redux';

import {
  MDBContainer,
} from 'mdbreact';

import Loader from '../../Loader/Loader';
import EquipmentItem from './EquipmentItem/EquipmentItem';

import './Equipment.scss';

const Equipment = () => {
  const {
    filtersReducer,
  } = useSelector((store) => store);

  const { filters, loading } = filtersReducer;


  const EquipmentList = () => {
    if (filters.length) {
      return filters[1].children.map((producer) => (
        <EquipmentItem
          key={producer._id}
          producer={producer}
        />
      ));
    }
    return null;
  };

  return (
    <MDBContainer className="py-4 px-0">
      <h3 className="h2-responsive text-center my-5 equipment__title">
        КОМПАНІЇ ВИРОБНИКИ
      </h3>
      { loading
        ? <Loader />
        : (
          <div className="equipment px-1">
            <EquipmentList />
          </div>
        )}
    </MDBContainer>
  );
};

export default Equipment;
