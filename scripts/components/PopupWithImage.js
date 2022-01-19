import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popup.querySelector('.popup__figure-img');
        this._descriptionText = this._popup.querySelector('.popup__figcaption');
    };

    openPopup(card) {
        super.openPopup();
        this._img.src = card.link;
        this._img.alt = card.name;
        this._descriptionText.textContent = card.name;
    };
}

export { PopupWithImage };
