const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatalogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
      default: null,
    },
    filter_name: {
      type: String,
    },
    aggregator: {
      type: Boolean,
    },
    checked: {
      type: Boolean,
    },
    country: {
      type: String,
    },
    imgSrc: {
      type: String,
    },
  },
  { strict: true },
);

CatalogSchema.virtual('children', {
  ref: 'Catalog',
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  options: { sort: { name: 1 }, limit: 0 },
});

CatalogSchema.statics.getRootFilters = function () {
  return this.find({ parent: null });
};

CatalogSchema.methods.getChildren = function () {
  return this.model('Catalog').where('parent', this._id);
};

module.exports = mongoose.model('Catalog', CatalogSchema);
