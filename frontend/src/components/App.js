import React, {useState, useEffect} from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";

// Импортируем компоненты
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import auth from "../utils/auth";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import successPicture from "../images/success-pict.svg";
import failurePicture from "../images/failure-pict.svg";

export default function App() {
    // Попапы и отрисовка основной страницы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [deletedCard, setDeletedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    // Авторизация и регистрация
    const [infoTooltipData, setInfoTooltipData] = useState({successReg: false, message: ""});
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    // Получение от сервера данных профиля и начальных карточек
    useEffect(() => {
        if (isLogin) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, initialCards]) => {
                    setCurrentUser(userData);
                    setCards(initialCards);
                })
                .catch((err) => console.log(err));
        }
    }, [isLogin]);

    // Обработчики открытия попапов
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }
    function handleCardDelete(card) {
        setDeletedCard(card);
        setIsConfirmPopupOpen(true);
    }

    // Обработчик закрытия попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
    }

    // Закрытие попапов при клике в пустую область
    function closePopupByClick(evt) {
        if (evt.target === evt.currentTarget) {
            closeAllPopups();
        }
    }

    // Функция, изменяющая данные профиля
    function handleUpdateUser(userData) {
        api.editProfile(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    // Функция, изменяющая аватар профиля
    function handleUpdateAvatar(avatarData) {
        api.editAvatar(avatarData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    // Функция, добавляющая новую карточку
    function handleAddPlaceSubmit(cardData) {
        api.addNewCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    // Функция, ставящая и убирающая лайк карточке
    function handleCardLike(card) {
        const isLiked = card.likes.some(person => person._id === currentUser._id);
        api.changeLike(card._id, !isLiked)
            .then(newCard => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    }

    // Функция, удаляющая карточку
    function handleRemoveCard() {
        api.removeCard(deletedCard._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== deletedCard._id));
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    // Функция, регистрирующая пользователя
    function handleRegister(regData) {
        auth.register(regData)
            .then(() => {
                setInfoTooltipData({successReg: true, message: "Вы успешно зарегистрировались!"});
                navigate("/sign-in");
            })
            .catch((err) => {
                setInfoTooltipData({successReg: false, message: "Что-то пошло не так! Попробуйте ещё раз."});
                console.log(err);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
            })
    }

    // Функция, авторизующая пользователя
    function handleLogin(loginData) {
        auth.authorize(loginData)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setIsLogin(true);
                    navigate("/mesto");
                }
            })
            .catch((err) => {
                setInfoTooltipData({successReg: false, message: "Что-то пошло не так! Попробуйте ещё раз."});
                setIsInfoTooltipPopupOpen(true);
                console.log(err);
            })
    }

    // Функция выхода из профиля
    function handleLogout() {
        setIsLogin(false);
        localStorage.removeItem("token");
        navigate("/sign-in");
    }

    // Проверка токена
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setIsLogin(true);
                    setEmail(res.data.email);
                    navigate("/react-mesto-auth", {replace: true});
                })
                .catch((err) => console.log(err));
        }
    }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header
            userEmail={email}
            isLogin={isLogin}
            isLogout={handleLogout}
        />

        <Routes>
            <Route
                path="/sign-up"
                element={<Register handleRegister={handleRegister} />}
            />
            <Route
                path="/sign-in"
                element={<Login handleLogin={handleLogin} />}
            />
            <Route
                path="*"
                element={isLogin ? <Navigate to="/react-mesto-auth" /> : <Navigate to="/sign-in" />}
            />
            <Route
                path="/react-mesto-auth"
                element={
                    <ProtectedRoute
                        isLogin={isLogin}
                        element={Main}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                }
            />
        </Routes>

        <Footer />

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
            onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
            onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
            onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
            onConfirm={handleRemoveCard}
        />
        <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
        />
        <InfoTooltip
            infoImage={infoTooltipData.successReg ? successPicture : failurePicture}
            infoMessage={infoTooltipData.message}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            onCloseByClick={closePopupByClick}
        />
    </CurrentUserContext.Provider>
  );
}