const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { URL_VALIDATION_ERROR } = require('../utils/error-messages');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
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
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: URL_VALIDATION_ERROR,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: URL_VALIDATION_ERROR,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: URL_VALIDATION_ERROR,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
