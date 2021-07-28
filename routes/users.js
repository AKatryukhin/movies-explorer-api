const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  updateUser,
  getProfile,
} = require('../controllers/users');


router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

router.get('/me', getProfile);


module.exports = router;
