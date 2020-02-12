const express = require('express');

const router = express.Router();
const Product = require('../models/Product');
const { getFilterObject } = require('./helpers/helpers');

// @route   GET /api/products
// @desc    GET existing products
// @access  Public
// http://localhost:5000/api/products?startPage=1&perPage=6&sort=price
router.get('/', async (req, res) => {
  const startPage = Number(req.query.startPage);
  const perPage = Number(req.query.perPage);

  try {
    const data = await Product.find()
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(req.query.sort);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(204).send({ message: 'Products not found.' });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   GET /api/products/filter
// @desc    GET filtered products
// @access  Public
// http://localhost:5000/api/products/filter?type=кавоварка%20автоматична&producer=Bosch,Delonghi&coffee_type=зерна,мелений&installation=настільна,вбудована&minPrice=10&maxPrice=50000&mill=true&grinding_degree=true&cappuccino=true&display=true&cleaning=true&startPage=1&perPage=2&sort=price
router.get('/filter', async (req, res) => {
  const filter = await getFilterObject(req.query);
  const startPage = Number(req.query.startPage);
  const perPage = Number(req.query.perPage);

  try {
    const products = await Product.find(filter)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(req.query.sort);
    if (products) {
      products.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.quantity = undefined;
      });
      const productsCount = await Product.find(filter).countDocuments();
      if (productsCount > 0) {
        const data = {
          productsCount,
          products,
        };
        res.status(200).send(data);
      } else {
        const data = {
          productsCount: 0,
          products: [],
        };
        res.status(200).send(data);
      }
    } else {
      res.status(204).send({ message: 'Product not found.' });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/filter/prices', async (req, res) => {
  const minPriceObj = await Product.findOne().sort({
    price: 1,
  });

  const maxPriceObj = await Product.findOne().sort({
    price: -1,
  });

  try {
    if (minPriceObj && maxPriceObj) {
      res.status(200).send({ minPrice: minPriceObj.price, maxPrice: maxPriceObj.price });
    } else {
      res.status(204).send({ message: 'Min & Max prices not found.' });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/search', async (req, res) => {
  if (!req.query.q) {
    res.status(400).json({ errorMessage: 'Query string is empty.' });
  } else {
    const query = req.query.q.trim();
    if (query) {
      Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { overview: { $regex: query, $options: 'i' } },
          { code: parseInt(query, 10) ? { $eq: query } : null },
        ],
      }).sort(req.query.sort)
        .then((products) => res.send(products))
        .catch((e) => {
          console.error(e);
          res.status(400).json({ errorMessage: 'Не знайдено!' });
        });
    }
  }
});

// @route   GET /api/products/:id
// @desc    GET existing product by _id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(204).send({ message: `Product with _id: ${req.params.id} not found.` });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
