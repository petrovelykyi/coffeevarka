const express = require('express');
const City = require('../models/City');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cities = await City.find({}).select('-_id -__v');
    if (cities) {
      res.status(200).send(cities);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
