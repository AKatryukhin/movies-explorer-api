const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_PAGE_ERROR } = require('../utils/responseMesseges');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signout', logout);

router.use('/users', auth, routerUsers);

router.use('/movies', auth, routerMovies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошенный маршрут не найден'));
});

module.exports = router;
