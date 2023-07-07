import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onCloseByClick, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    //Заполнение полей инпутов данными профиля
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleInputName(evt) {
        setName(evt.target.value);
    }

    function handleInputDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({name, about: description});
    }

    return(
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClick={onCloseByClick}
            onSubmit={handleSubmit}>
                <label className="popup__form-label">
                    <input
                        className="popup__input popup__input_type_name"
                        type="text"
                        id="name-input"
                        name="name"
                        placeholder="Как вас зовут?"
                        minLength="2"
                        maxLength="40"
                        onChange={handleInputName}
                        value={name ?? ""}
                        required />
                     <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__form-label">
                    <input
                        className="popup__input popup__input_type_job"
                        type="text"
                        id="job-input"
                        name="about"
                        placeholder="Чем занимаетесь?"
                        minLength="2"
                        maxLength="200"
                        onChange={handleInputDescription}
                        value={description ?? ""}
                        required />
                     <span className="popup__input-error job-input-error"></span>
                </label>
        </PopupWithForm>
    );
}
