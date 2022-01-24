
import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandle) {
        super(popupSelector);
        this._submitHandle = submitHandle;
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit');
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', e => {
            e.preventDefault();
            this._submitHandle(this._getInputValues(), this._submitButton);
            this.closePopup();
        });
    };

    closePopup() {
        super.closePopup();
        this._form.reset();
    };
}

export { PopupWithForm };
