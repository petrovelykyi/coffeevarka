const express = require('express');

const router = express.Router();
const Catalog = require('../models/Catalog');

// @route   GET /category
// @desc    GET existing filters
// @access  Public
// http://localhost:5000/catalog
router.get('/', async (req, res) => {
  try {
    const filters = await Catalog.getRootFilters();
    const data = [];
    if (filters.length) {
      for (const filter of filters) {
        const obj = JSON.parse(JSON.stringify(filter));
        obj.children = await filter.getChildren();
        data.push(obj);
      }
      res.status(200).send(data);
    } else {
      res.status(204).send([]);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
