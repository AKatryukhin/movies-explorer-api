require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const corsa = require('./middlewares/corsa');
const { login, createUser, logout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-err');
const {
  MONGO_URL,
} = require('./utils/constants');
const { PORT = 3000 } = process.env;

const app = express();
const limiter = rateLimit({
  windowMs: 90000,
  max: 100,
});

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    app.listen(PORT);
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(`Init application error: ${error}`);
  }
}

app.use(corsa);
app.use(requestLogger);
app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signout', logout);

app.use('/users', auth, require('./routes/users'));

app.use('/movies', auth, require('./routes/movies'));


app.use(errorLogger);

app.use(errors());

app.use('/', (req, res, next) => {
  next(new NotFoundError('Запрошенный маршрут не найден'));
});

app.use((err, req, res, next) => serverError(err, req, res, next));

start();
