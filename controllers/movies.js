const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const CopyrightError = require('../errors/copyright-err');
const {
  COPYRIGHT_MOVIE_ERROR,
  VALIDATION_DATA_ERROR,
  NOT_FOUND_DATA_MOVIE_ERROR,
} = require('../utils/error-messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(200).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(VALIDATION_DATA_ERROR);
      }
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_DATA_MOVIE_ERROR);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new CopyrightError(COPYRIGHT_MOVIE_ERROR);
      }
      Movie.deleteOne({ _id: movie._id })
        .then(() => {
          res.status(200).send({ movie });
        })
        .catch(next);
    })
    .catch(next);
};
