const Card = require('../models/card');
const code = require('../utils/codes');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(code.ok).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner: userId })
    .then((newCard) => res.status(code.created).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Произошла ошибка при создании карточки'));
      }
      return next(err);
    });
};

const deleteCardById = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Чужую карточку удалить нельзя');
    }
    return Card.findByIdAndRemove(req.params.cardId)
      .then(() => res.status(code.ok).send({ message: 'Карточка удалена' }));
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Произошла ошибка при удалении карточки'));
    }
    return next(err);
  });

const putLike = (req, res, next) => {
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((like) => {
      if (like) {
        return res.status(code.ok).send(like);
      }
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Произошла ошибка при постановке лайка'));
      }
      return next(err);
    });
};

const removeLike = (req, res, next) => {
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((like) => {
      if (like) {
        return res.status(code.ok).send(like);
      }
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Произошла ошибка при удалении лайка'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLike,
  removeLike,
};
