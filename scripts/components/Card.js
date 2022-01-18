import { popupZoomImage, figcaption, figureImg } from "../utils/constants.js";
import { openPopup } from "../utils/popup.js";

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    };

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _handleOpenZoomPopup() {
        figureImg.src = this._link;
        figureImg.alt = this._name;
        figcaption.textContent = this._name;
        openPopup(popupZoomImage)
    };

    _setEventListeners(elementsImage) {
        elementsImage.addEventListener('click', () => {
            this._handleOpenZoomPopup();
        });

        const likeCard = this._element.querySelector('.like-button');
        likeCard.addEventListener('click',() => likeCard.classList.toggle('like-button_active'));

        const deleteCardButton = this._element.querySelector('.delete-element-button');
        deleteCardButton.addEventListener('click',() => {
            this._element.remove();
            this._element = null;
        });
    };

    generateCard() {
        this._element = this._getTemplate();
        const elementsImage = this._element.querySelector('.element__mask-group');
        this._setEventListeners(elementsImage);
        elementsImage.alt = this._name;
        elementsImage.src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    };
}

export { Card };