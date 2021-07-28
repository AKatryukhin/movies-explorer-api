const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_URL,
} = require('./utils/constants');
const { PORT = 3000 } = process.env;

const app = express();

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







start();
