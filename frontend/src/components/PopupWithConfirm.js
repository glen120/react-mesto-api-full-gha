import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirm({isOpen, onClose, onCloseByClick, onConfirm}) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirm();
    }

    return(
        <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClick={onCloseByClick}
            onSubmit={handleSubmit}
        />
    );
}