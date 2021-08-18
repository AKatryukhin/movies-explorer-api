const REG_LINK = /https?:\/\/[\w{1,}\W{1,}]+#?\./;
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

const allowedCors = [
  'http://localhost:3000',
  'https://movies-search.nomoredomains.club',
  'http://movies-search.nomoredomains.club',
];
module.exports = {
  REG_LINK,
  MONGO_URL,

  allowedCors,
  ALLOWED_METHODS,
};
