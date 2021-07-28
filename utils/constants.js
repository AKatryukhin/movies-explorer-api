const REG_LINK = /https?:\/\/[\w{1,}\W{1,}]+#?\./;
const REG_RU = /[а-я0-9\sё]/gi;
const REG_EN = /[a-z0-9\-]/gi;
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

const allowedCors = [
  'https://mesto.front.nomoredomains.monster',
  'http://mesto.front.nomoredomains.monster',
];
module.exports = {
  REG_LINK,
  REG_RU,
  REG_EN,
  MONGO_URL,
  allowedCors,
  ALLOWED_METHODS,
};
