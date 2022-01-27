
import { PopupWithForm } from "./PopupWithForm.js";

class Card {
    constructor(data, templateSelector, { handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _setEventListeners(elementsImage) {
        elementsImage.addEventListener('click', () => {
            this._handleCardClick({name : elementsImage.name, link: elementsImage.src});
        });

        const likeCard = this._element.querySelector('.like-button');
        likeCard.addEventListener('click',() => likeCard.classList.toggle('like-button_active'));

        const deleteCardButton = this._element.querySelector('.delete-element-button');
        deleteCardButton.addEventListener('click',() => {
            const popupConfirm = new PopupWithForm('.popup_confirm',() => {
                this._element.remove();
                this._element = null;
                popupConfirm.closePopup();
            });
            popupConfirm.openPopup()
            popupConfirm.setEventListeners();
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
