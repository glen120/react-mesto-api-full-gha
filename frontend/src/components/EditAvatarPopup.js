import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onCloseByClick, onUpdateAvatar}) {
    const avatarInputRef = React.useRef();

    // Очистка инпута при открытии попапа
    React.useEffect(() => {
        avatarInputRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarInputRef.current.value,
        });
    }

    return(
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClick={onCloseByClick}
            onSubmit={handleSubmit}>
                <label className="popup__form-label">
                    <input
                        className="popup__input popup__input_avatar_link"
                        type="url"
                        id="avatar-input"
                        name="avatar"
                        placeholder="Ссылка на аватар"
                        ref={avatarInputRef}
                        required />
                        <span className="popup__input-error avatar-input-error"></span>
                    </label>
        </PopupWithForm>
    );
}