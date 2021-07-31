const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { method } = require('../middlewares/url_validator');

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    image: Joi.string().required().custom(method),
    trailer: Joi.string().required().custom(method),
    thumbnail: Joi.string().required().custom(method),
    nameRU: Joi.string().min(2).max(60).required(),
    nameEN: Joi.string().min(2).max(60).required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).max(300).required(),
    movieId: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), removeMovie);

module.exports = router;
