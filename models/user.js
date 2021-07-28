// const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const mongoose = require('mongoose');

// const {
//   REG_LINK,
// } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Александр',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: 'email не может быть пустым',
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
    dropDups: true,
  },
  password: {
    type: String,
    required: 'password не может быть пустым',
    minlength: 8,
    select: false,
  },
});

// eslint-disable-next-line func-names
// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           return user;
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
