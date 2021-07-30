const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const CopyrightError = require('../errors/copyright-err');

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
        throw new ValidationError('Переданы некорректные данные в методы создания фильма');
      }
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new CopyrightError('Невозможно удалить чужой фильм');
      }
      Movie.deleteOne({ _id: movie._id })
        .then(() => {
          res.status(200).send({ movie });
        })
        .catch(next);
    })
    .catch(next);
};
