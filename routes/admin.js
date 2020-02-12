const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const Catalog = require('../models/Catalog');
const Product = require('../models/Product');
const City = require('../models/City');
const { jwtStrategy } = require('./config/strategies');

const inCatalog = './data/in/catalog.csv';
const inProduct = './data/in/product.csv';
const inCity = './data/in/city.csv';

const router = express.Router();

jwtStrategy();

/* GET admin listing. */
router.get('/', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  // console.log(req);
  res.status(200).send({ name: 'Petro' });
});

// Loading data from .csv files
router.post('/load', async (req, res) => {
  async function existCollection(value) {
    const { connection } = mongoose;
    const collections = await connection.db.listCollections()
      .toArray();
    return collections.some((item) => item.name === value);
  }

  const result = {};
  try {
    if (await existCollection('catalogs')) {
      await Catalog.collection.drop();
      console.log('Collection "catalogs" dropped!');
    }

    const data = fs.readFileSync(inCatalog, 'utf-8', 'r');
    const strings = data.toString()
      .split('\n');
    const strings2d = [];

    strings.forEach((str) => {
      strings2d.push(str.split(';'));
    });
    const root = [];
    for (let i = 0, l = strings2d[0].length; i < l; i += 1) {
      const tmp = strings2d[0][i].split(':');
      root.push(tmp[0]);
      if (i !== l - 1) {
        await new Catalog({
          name: tmp[0],
          filter_name: tmp[1],
          aggregator: true,
        }).save();
      } else {
        await new Catalog({
          name: tmp[0],
          filter_name: tmp[1],
          aggregator: false,
        }).save();
      }
    }
    for (let i = 1, l = strings2d.length; i < l; i += 1) {
      for (let j = 0, ll = root.length; j < ll; j += 1) {
        if (j !== ll - 1) {
          if (strings2d[i][j]) {
            const parent = await Catalog.findOne({ name: root[j] });
            if (j === 1) {
              const tmp = strings2d[i][j].split(':');
              await new Catalog({
                name: tmp[0],
                parent: parent._id,
                filter_name: '',
                checked: false,
                country: tmp[1],
                imgSrc: tmp[2],
              }).save();
            } else {
              await new Catalog({
                name: strings2d[i][j],
                parent: parent._id,
                filter_name: '',
                checked: false,
              }).save();
            }
          }
        } else {
          if (strings2d[i][j]) {
            const parent = await Catalog.findOne({ name: root[j] });
            const tmp = strings2d[i][j].split(':');
            await new Catalog({
              name: tmp[0],
              parent: parent._id,
              filter_name: tmp[1],
              checked: false,
            }).save();
          }
        }
      }
    }

    // console.log(strings2d);
    result.catalog = 'ok';
  } catch (e) {
    console.log('File category.csv error:', e);
    res.status(400)
      .send(e);
    return;
  }

  const pathToProdImg = '/static/images/products';
  try {
    if (await existCollection('products')) {
      await Product.collection.drop();
      console.log('Collection "products" dropped!');
    }
    // const filterType = await Filter.findOne({ name: 'Використовувана кава' });
    const data = fs.readFileSync(inProduct, 'utf-8', 'r');
    const dataArr = data.toString().split('\n');
    for (let i = 2, l = dataArr.length; i < l; i += 1) {
      const tmp = dataArr[i].split(';');
      if (tmp.length > 1) {
        const product = new Product({});
        product.name = tmp[0].trim();
        product.price = tmp[1].trim();
        const producer = await Catalog.findOne({ name: tmp[2].trim() });
        if (producer) {
          product.producer = producer._id;
        }
        const type = await Catalog.findOne({ name: tmp[3].trim() });
        if (type) {
          product.type = type._id;
        }
        const installation = await Catalog.findOne({ name: tmp[4].trim() });
        if (installation) {
          product.installation = installation._id;
        }
        product.power = tmp[5].trim();
        product.pressure = tmp[6].trim();
        product.water_capacity = tmp[7].trim();
        const coffeeTypeArr = tmp[8].trim()
          .split(',');
        for (let j = 0, ctl = coffeeTypeArr.length; j < ctl; j += 1) {
          const coffeeType = await Catalog.findOne({ name: coffeeTypeArr[j].trim() });
          if (coffeeType) {
            product.coffee_type.push(coffeeType._id);
          }
        }
        product.weight = tmp[9].trim();
        product.color = tmp[10].trim();
        product.mill = Boolean(tmp[11].trim());
        product.grinding_degree = Boolean(tmp[12].trim());
        product.cappuccino = Boolean(tmp[13].trim());
        product.display = Boolean(tmp[14].trim());
        product.cleaning = Boolean(tmp[15].trim());

        const imgArr = tmp[16].trim()
          .split(',');
        for (let j = 0, ial = imgArr.length; j < ial; j += 1) {
          product.imageUrls.push(path.join(pathToProdImg,
            tmp[2].trim()
              .toLowerCase(),
            `${imgArr[j].trim()}.jpg`));
        }
        product.overview = tmp[17].trim();
        product.quantity = 3;
        await product.save();
      }
    }

    result.product = 'ok';
  } catch (e) {
    console.log('File product.csv error:', e);
    res.status(400)
      .send(e);
    return;
  }

  try {
    if (await existCollection('cities')) {
      await City.collection.drop();
      console.log('Collection "cities" dropped!');
    }
    const data = fs.readFileSync(inCity, 'utf-8', 'r');
    const dataArr = data.toString().split('\n');
    for (let i = 1, l = dataArr.length; i < l; i += 1) {
      const tmp = dataArr[i].split(';');
      if (tmp.length > 1) {
        const city = new City({});
        city.checked = tmp[0].trim();
        city.value = tmp[1].trim();
        await city.save();
      }
    }

    result.city = 'ok';
  } catch (e) {
    console.log('File city.csv error:', e);
    res.status(400)
      .send(e);
    return;
  }

  console.log('Result:', result);
  res.status(200)
    .send(result);
});

module.exports = router;
