import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__like-button ${isLiked && "card__like-button_active"}`);

    function handleCardClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <li className="card__cell">
            {isOwn && <button
                className="card__bin-button"
                type="button"
                aria-label="Удалить"
                onClick={handleCardDelete}></button>}
            <img src={card.link} alt={card.name} className="card__image" onClick={handleCardClick} />
            <h2 className="card__title">{card.name}</h2>
            <div className="card__like">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Нравится"
                    onClick={handleCardLike}></button>
                <span className="card__like-counter" >{card.likes.length}</span>
            </div>
        </li>
    );
}