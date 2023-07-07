const { celebrate, Joi } = require('celebrate');

const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)(www\.)?[0-9a-z]+([.|-][0-9a-z]+)*\.[0-9a-z]+(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/i),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)(www\.)?[0-9a-z]+([.|-][0-9a-z]+)*\.[0-9a-z]+(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/i),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)(www\.)?[0-9a-z]+([.|-][0-9a-z]+)*\.[0-9a-z]+(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/i),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  getUserByIdValidator,
  updateUserValidator,
  updateAvatarValidator,
  createCardValidator,
  cardIdValidator,
};
