const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
// const {
//   REG_RU,
//   REG_EN
// } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
    // match: REG_RU
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
    // match: REG_EN
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
    image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'адрес должен быть ссылкой',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'адрес должен быть ссылкой',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'адрес должен быть ссылкой',
    },
  },
});

module.exports = mongoose.model('card', movieSchema);
