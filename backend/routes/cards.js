const cards = require('express').Router();
const {
  getCards, createCard, deleteCardById, putLike, removeLike,
} = require('../controllers/cards');
const { createCardValidator, cardIdValidator } = require('../middlewares/validation');

cards.get('/cards', getCards);
cards.post('/cards', createCardValidator, createCard);
cards.delete('/cards/:cardId', cardIdValidator, deleteCardById);
cards.put('/cards/:cardId/likes', cardIdValidator, putLike);
cards.delete('/cards/:cardId/likes', cardIdValidator, removeLike);

module.exports = cards;
