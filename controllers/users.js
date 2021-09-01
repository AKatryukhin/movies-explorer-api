require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthentificationError = require('../errors/authentification-err');
const ValidationError = require('../errors/validation-err');
const DuplicateError = require('../errors/duplicate-err');
const {
  AUTHENTIFICATION_ERROR,
  NOT_FOUND_DATA_USER_ERROR,
  VALIDATION_DATA_ERROR,
  DUPLICATE_ERROR,
} = require('../utils/error-messages');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports.logout = (req, res, next) => {
  const { email } = req.body;
  return User.findOne({ email })
    .then((user) => {
      res
        .clearCookie('jwt', {
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch(() => {
      next(new AuthentificationError(AUTHENTIFICATION_ERROR));
    });
};

module.exports.getProfile = (req, res, next) => User.findOne({ _id: req.user._id })
  .then((user) => {
    if (!user) {
      throw new NotFoundError(NOT_FOUND_DATA_USER_ERROR);
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(VALIDATION_DATA_ERROR);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new DuplicateError(DUPLICATE_ERROR);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_DATA_USER_ERROR);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(VALIDATION_DATA_ERROR);
      }
    })
    .catch(next);
};
