export default function PopupWithForm({name, title, buttonText, isOpen, onClose, onCloseByClick, children, onSubmit}) {
    return (
        <div className={`popup popup_${name}` + (isOpen && " popup_opened")} onMouseDown={onCloseByClick}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button
                        className="popup__save-button"
                        type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}