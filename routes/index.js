const express = require('express');

// const ProductList = require('../models/_Product.js_');
// const Equipment = require('../models/_Category.js_');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
