import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar-image" />
                    <button
                        className="profile__avatar-button"
                        type="button"
                        aria-label="Изменить аватар"
                        onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={onEditProfile}></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="card">
                    {cards.map((cardData) => (
                        <Card
                            card={cardData}
                            key={cardData._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}