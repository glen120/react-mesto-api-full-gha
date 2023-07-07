const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const code = require('../utils/codes');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(code.ok).send(users))
  .catch(next);

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (user) {
      res.status(code.ok).send(user);
    } else {
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Ошибочный поисковый запрос'));
    }
    return next(err);
  });

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (user) {
      res.status(code.ok).send(user);
    } else {
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Ошибочный поисковый запрос'));
    }
    return next(err);
  });

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(code.created).send({
        name, about, avatar, email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      } if (err.name === 'ValidationError') {
        return next(new BadRequestError('Произошла ошибка при создании пользователя'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(code.ok).send({ _id: token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(code.ok).send(user);
      } else {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Произошла ошибка при обновлении профиля'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((userAvatar) => {
      if (userAvatar) {
        res.status(code.ok).send(userAvatar);
      } else {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Произошла ошибка при обновлении аватара'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateUser,
  updateAvatar,
};
