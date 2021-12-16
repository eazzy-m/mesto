

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _closePopupByEcs(evt) {
        if (evt.key === 'Escape') {
            const popup = document.querySelector('.popup_open');
            popupClose(popup);
        }
    };

    _closePopupByMousedown(evt) {
        if (evt.target.classList.contains('popup_open')) {
            const popup = document.querySelector('.popup_open')
            popupClose(popup);
        }
    };

    _handleOpenPopup() {
        popupZoomImage.classList.add('popup_open');
        figureImg.src = this._link;
        figureImg.alt = this._name;
        figcaption.textContent = this._name;
        document.addEventListener('keydown', this._closePopupByEcs);
        document.addEventListener('mousedown', this._closePopupByMousedown);
    };

    _handleClosePopup() {
        popupZoomImage.classList.remove('popup_open');
        document.removeEventListener('keydown', this._closePopupByEcs);
        document.removeEventListener('mousedown', this._closePopupByMousedown);
    }

    _setEventListeners() {
        this._element.querySelector('.element__mask-group').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        exitZoomImageButton.addEventListener('click', () => {
            this._handleClosePopup();
        });

        const likeCard = this._element.querySelector('.like-button');
        likeCard.addEventListener('click', function (evt) {
            evt.target.classList.toggle('like-button_active');
        })

        const deleteCard = this._element.querySelector('.delete-element-button');
        deleteCard.addEventListener('click' ,function () {
            const element = deleteCard.closest('.element');
            element.remove();
        })
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__mask-group').alt = this._name;
        this._element.querySelector('.element__mask-group').src = this._link;

        return this._element;
    }

}