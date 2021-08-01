require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const corsa = require('./middlewares/corsa');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/error');
const router = require('./routes/index');

const { PORT = 3000, NODE_ENV, BASE_URL } = process.env;
const {
  MONGO_URL,
} = require('./utils/constants');

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
    await mongoose.connect(NODE_ENV === 'production' ? BASE_URL : MONGO_URL, {
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

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => serverError(err, req, res, next));

start();
