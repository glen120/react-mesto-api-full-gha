export default function InfoTooltip({infoImage, infoMessage, isOpen, onClose, onCloseByClick}) {
    return (
        <div className={`popup popup_tooltip` + (isOpen && " popup_opened")} onMouseDown={onCloseByClick}>
            <div className="popup__container popup__tooltip-container">
                <button className="popup__close-button"
                        type="button"
                        aria-label="Закрыть"
                        onClick={onClose}></button>
                <img className="popup__tooltip-image" src={infoImage} alt={infoMessage}/>
                <p className="popup__tooltip-sign">{infoMessage}</p>
            </div>
        </div>
    )
}