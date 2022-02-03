
class Card {
    constructor(data, templateSelector, user, { handleCardClick, handleDeleteCard, handleLikeCard }) {
        this.data = data;
        this.user = user;
        this.name = this.data.name;
        this.link = this.data.link;
        this.likes = this.data.likes;
        this.id = this.data._id;
        this.ownerId = this.data.owner._id;
        this.userId = this.user.id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
    };

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _setEventListeners(elementsImage) {
        elementsImage.addEventListener('click', () => this._handleCardClick({ name : this.name, link: this.link }));

        this._element.querySelector('.like-button').addEventListener('click',() => this._handleLikeCard(this));

        const deleteCardButton = this._element.querySelector('.delete-element-button');
        this.ownerId === this.userId ?
            (deleteCardButton.addEventListener('click', () => this._handleDeleteCard(this)))
         : (deleteCardButton.remove())
    };

    removeCard() {
        this._element.remove();
    };

    _toggleLike() {
        this._element.querySelector('.element__like-counter').textContent = this.likes.length;
        this._element.querySelector('.like-button').classList.toggle('like-button_active', this.isLiked());
    };

    isLiked() {
        return Boolean(this.likes.find(item => item._id === this.userId));
    };

    updateLikeCounter(data) {
        this.likes = data.likes;
        this._toggleLike();
    };

    generateCard() {
        this._element = this._getTemplate();
        this._toggleLike();
        const elementsImage = this._element.querySelector('.element__mask-group');
        this._likeButton = this._element.querySelector('.like-button');
        this._setEventListeners(elementsImage);
        elementsImage.alt = this.name;
        elementsImage.src = this.link;
        this._element.querySelector('.element__text').textContent = this.name;

        return this._element;
    };
}

export { Card };
