
class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._exitButton = this._popup.querySelector('.exit-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleMousedownClose = this._handleMousedownClose.bind(this);
    };

    _handleEscClose(e) {
        if (e.key === 'Escape') this.closePopup();
    };

    _handleMousedownClose(e) {
        if (e.target.classList.contains('popup_open')) this.closePopup();
    };

    setEventListeners() {
        this._exitButton.addEventListener('click', () => this.closePopup());
    };

    openPopup() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._handleMousedownClose);
    };

    closePopup() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handleMousedownClose);
    };
}

export { Popup };
