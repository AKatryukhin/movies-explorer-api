require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthentificationError = require('../errors/authentification-err');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthentificationError('Передан неверный логин или пароль');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthentificationError('Передан неверный логин или пароль'));
  }
  req.user = payload;
  next();
};
