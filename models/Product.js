const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    // Название модели
    name: {
      type: String,
      require: true,
      index: true,
    },
    // Артикул
    code: {
      type: Number,
    },
    // Цена
    price: {
      type: Number,
      require: true,
    },
    //* Основные характеристики *//
    // Производитель
    producer: {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
      autopopulate: true,
    },
    // Тип
    type: {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
      autopopulate: true,
    },
    // Способ установки
    installation: {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
      autopopulate: true,
    },
    // Мощность, Вт
    power: {
      type: Number,
    },
    // Давление, бар
    pressure: {
      type: Number,
    },
    // Объем резервуара для воды, л
    water_capacity: {
      type: Number,
    },
    // Используемый кофе
    coffee_type: [{
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
      autopopulate: true,
    }],
    // Вес, кг
    weight: {
      type: Number,
    },
    // Цвет
    color: {
      type: String,
    },
    //*  Оснащение *//
    // Наличие мельницы
    mill: {
      type: Boolean,
    },
    // Регулировка степени помола
    grinding_degree: {
      type: Boolean,
    },
    // Функция "cappuccino"
    cappuccino: {
      type: Boolean,
    },
    // Дисплей
    display: {
      type: Boolean,
    },
    // Система самоочистки
    cleaning: {
      type: Boolean,
    },
    // Ссылки на изображения
    imageUrls: [
      {
        type: String,
      },
    ],
    // Обзор
    overview: {
      type: String,
      index: true,
    },
    // Количество
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { strict: true },
);

ProductSchema.statics.getRefKeys = (() => [
  'type',
  'producer',
  'coffee_type',
  'installation',
]);

ProductSchema.statics.getTruthyKeys = (() => [
  'mill',
  'grinding_degree',
  'cappuccino',
  'display',
  'cleaning',
]);

ProductSchema.statics.excludedKeys = (() => [
  'perPage',
  'startPage',
  'minPrice',
  'maxPrice',
  'sort',
]);

ProductSchema.plugin(AutoIncrement, { inc_field: 'code', collection_name: 'products_seq', start_seq: 100001 });

ProductSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Product', ProductSchema);
