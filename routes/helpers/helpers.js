const axios = require('axios');
const Catalog = require('../../models/Catalog');
const Product = require('../../models/Product');

// *****************************************************************
function getIds(query, key) {
  const typeIds = query[key].split(',').map((name) => Catalog.findOne({ name }));
  return Promise.all(typeIds);
}

const getFilterObject = async (query) => {
  const result = {};
  Object.assign(result, query);

  // ProductList.getRefKeys()
  //   .filter((key) => key in query && query[key] && query[key] !== '')
  //   .reduce(async (result, key) => {
  //     result[key] = { $in: await getIds(query, key) };
  //     return result;
  //   }, result);
  // console.log(result);

  for (const key of Product.getRefKeys()) {
    if (key in query && query[key] && query[key] !== '') {
      result[key] = { $in: await getIds(query, key) };
    }
  }

  if (query.minPrice || query.maxPrice) {
    result.price = {
      $gte: Number(query.minPrice),
      $lte: Number(query.maxPrice),
    };
  }

  Product.getTruthyKeys()
    .filter((key) => key in query && query[key] && query[key] !== '')
    .forEach((key) => { result[key] = Boolean(key); });

  Product.excludedKeys()
    .filter((key) => key in result)
    .forEach((key) => { delete result[key]; });

  result.quantity = {
    $gt: 0,
  };

  return result;
};

// *****************************************************************
const getQueryString = (obj) => Object
  .keys(obj)
  // eslint-disable-next-line security/detect-object-injection
  .map((key) => `${key}=${obj[key]}`)
  .join('&');

const getRecaptchaStatus = async (token) => {
  const queryObject = {
    secret: process.env.NODE_ENV === 'production'
      ? process.env.RECAPTCHA_SECRET_KEY_PROD
      : process.env.RECAPTCHA_SECRET_KEY_DEV,
    response: token,
  };
  const queryString = getQueryString(queryObject);
  try {
    const status = await axios.post(`${process.env.GOOGLE_URL}${queryString}`);
    return status.data;
  } catch (e) {
    console.log(e);
  }
  return null;
};

module.exports = {
  getFilterObject,
  getRecaptchaStatus,
};
