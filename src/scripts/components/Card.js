
import { PopupWithForm } from "./PopupWithForm.js";

class Card {
    constructor(data, templateSelector, userId, { handleCardClick, handleDeleteCard, handleLikeCard }) {
        this.data = data;
        this.name = this.data.name;
        this.link = this.data.link;
        this.likes = this.data.likes;
        this.id = this.data._id;
        this.ownerId = this.data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this.userId = userId;
    };

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _setEventListeners(elementsImage) {
        elementsImage.addEventListener('click', () => this._handleCardClick({ name : elementsImage.name, link: elementsImage.src }))

        const likeCard = this._element.querySelector('.like-button');
        likeCard.addEventListener('click',() => likeCard.classList.toggle('like-button_active'));

        const deleteCardButton = this._element.querySelector('.delete-element-button');
        console.log(`ownerID ${this.ownerId}, userID ${this.userId}`)
        if (this.ownerId === this.userId) {
            deleteCardButton.addEventListener('click', () => {
                const popupConfirm = new PopupWithForm('.popup_confirm', () => {
                    console.log(popupConfirm)
                    this._handleDeleteCard(this.id, popupConfirm);
                    this._element.remove();
                });
                popupConfirm.openPopup();
                popupConfirm.setEventListeners();
            });
        } else deleteCardButton.remove();
    };

    removeCard() {
        this._element.remove();
        // this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementsImage = this._element.querySelector('.element__mask-group');
        this._setEventListeners(elementsImage);
        elementsImage.alt = this.name;
        elementsImage.src = this.link;
        this._element.querySelector('.element__like-counter').textContent = this.likes.length;
        this._element.querySelector('.element__text').textContent = this.name;

        return this._element;
    };
}

export { Card };
