import React from 'react';
import { MDBIcon, toast } from 'mdbreact';
import { load } from 'recaptcha-v3';
import moment from 'moment/moment';
import 'moment/locale/uk';

export const copyObject = (o) => {
  let v;
  let key;
  const result = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    result[key] = (typeof v === 'object') ? copyObject(v) : v;
  }
  return result;
};

export const getUkrDate = (date) => moment(date)
  .locale('uk')
  .format('D MMMM YYYYр. HH:mm');

export const showToast = (type, message) => {
  if (type === 'info') {
    toast.info(
      <div className="ml-2">
        <MDBIcon icon="thumbs-up" className="mr-2" />
        <b>{message}</b>
      </div>,
      { closeButton: false },
    );
  }
  if (type === 'error') {
    toast.error(
      <div className="ml-2">
        <MDBIcon icon="exclamation-triangle" className="mr-2" />
        <b>{message}</b>
      </div>,
      { closeButton: false },
    );
  }
};

export const getToken = async (action) => {
  const recaptcha = await load(process.env.REACT_APP_SITE_KEY, {
    useRecaptchaNet: true,
    autoHideBadge: true,
  });
  const token = await recaptcha.execute(action);
  return token;
};

export const formatPrice = (price) => `${price.toFixed(0)
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}`;
