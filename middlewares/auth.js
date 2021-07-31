require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthentificationError = require('../errors/authentification-err');
const { AUTHENTIFICATION_ERROR } = require('../utils/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthentificationError(AUTHENTIFICATION_ERROR);
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthentificationError(AUTHENTIFICATION_ERROR));
  }
  req.user = payload;
  next();
};
