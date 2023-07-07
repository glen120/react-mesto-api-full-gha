import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onCloseByClick, onAddPlace}) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    // Очистка инпутов при открытии попапа
    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    function handleInputName(evt) {
        setName(evt.target.value);
    }

    function handleInputLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({name, link});
    }

    return(
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClick={onCloseByClick}
            onSubmit={handleSubmit}>
                <label className="popup__form-label">
                    <input
                        className="popup__input popup__input_card_name"
                        type="text"
                        id="place-input"
                        name="name"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        onChange={handleInputName}
                        value={name}
                        required
                    />
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-label">
                    <input
                        className="popup__input popup__input_card_link"
                        type="url"
                        id="link-input"
                        name="link"
                        placeholder="Ссылка на картинку"
                        onChange={handleInputLink}
                        value={link}
                        required
                    />
                    <span className="popup__input-error link-input-error"></span>
                </label>
        </PopupWithForm>
    );
}