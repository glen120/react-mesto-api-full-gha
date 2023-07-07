const users = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { getUserByIdValidator, updateUserValidator, updateAvatarValidator } = require('../middlewares/validation');

users.get('/users', getUsers);
users.get('/users/me', getCurrentUser);
users.get('/users/:userId', getUserByIdValidator, getUserById);
users.patch('/users/me', updateUserValidator, updateUser);
users.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = users;
