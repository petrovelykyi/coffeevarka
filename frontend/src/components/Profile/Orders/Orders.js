import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import OrderItem from './OrderItem/OrderItem';
import Loader from '../../Loader/Loader';

const Orders = ({ orders }) => {
  const {
    orderItemsReducer,
  } = useSelector((store) => store);

  const { loading } = orderItemsReducer;

  let listOrders = [];
  if (orders.length > 0) {
    listOrders = orders.map((order) => (
      <OrderItem key={order._id} order={order} />
    ));
  }

  return (
    loading
      ? <Loader />
      : (
        <>
          {listOrders.length > 0
            ? listOrders
            : (
              <div>
                <b>На жаль, у вас ще нема покупок :-(</b>
              </div>
            )}
        </>
      )
  );
};

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Orders;
