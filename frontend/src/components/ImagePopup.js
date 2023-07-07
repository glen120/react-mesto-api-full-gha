export default function ImagePopup({card, isOpen, onClose, onCloseByClick}) {
    return (
        <div className={`popup popup_image` + (isOpen && " popup_opened")} onMouseDown={onCloseByClick}>
            <div className="popup__image-container">
                <button className="popup__close-button popup__close-button_image"
                        type="button"
                        aria-label="Закрыть"
                        onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image-picture" />
                <p className="popup__image-sign">{card.name}</p>
            </div>
        </div>
    );
}