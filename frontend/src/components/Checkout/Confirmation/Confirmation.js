import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
} from 'mdbreact';

import Loader from '../../Loader/Loader';
import * as cartHandler from '../../Cart/CartHandler';

import {
  clearOrders,
  requestedOrderItemsSucceeded,
} from '../../../store/actions/OrderItemsActions';

import './Confirmation.scss';
import Order from '../Order/Order';


const Confirmation = () => {
  const {
    loading,
  } = useSelector((store) => store.orderItemsReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearOrders());
    window.localStorage.removeItem('cart');
  }, [dispatch]);

  const handleCartOperations = () => {
    dispatch(requestedOrderItemsSucceeded([]));
    cartHandler.calcTotalAmount();
  };

  const finishCartOperations = () => {
    handleCartOperations();
    history.push('/products/filter');
  };

  return (
    <div className="confirmation__bg">
      { loading
        ? <Loader />
        : (
          <MDBContainer>
            <Order />
            <div className="text-center">
              <MDBBtn
                color="amber"
                onClick={finishCartOperations}
              >
                <b>До вибору товарів</b>
              </MDBBtn>
            </div>
          </MDBContainer>
        )}
    </div>
  );
};

export default Confirmation;
