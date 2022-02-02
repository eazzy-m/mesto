
import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit');
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    };

    toggleButtonName(isToggle, text) {
        isToggle ? this._submitButton.textContent = text : this._submitButton.textContent = text;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', e => {
            e.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    };

    closePopup() {
        this._form.reset();
        super.closePopup();
    };
}

export { PopupWithForm };
