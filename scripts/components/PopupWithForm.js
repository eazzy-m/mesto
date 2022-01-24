
import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandle) {
        super(popupSelector);
        this._submitHandle = submitHandle;
        this._form = this._popup.querySelector('.form');
        this._submitHandler = this._submitHandler.bind(this);
    };

    _submitHandler(evt) {
        evt.preventDefault();
        this._submitHandle(this._getInputValues());
    };

    _getInputValues() {
        const inputsList = Array.from(this._form.querySelectorAll('.form__input'));
        const data = {};
        inputsList.forEach(input => data[input.name] = input.value);

        return data;
    };

    setEventListeners() {
        this._form.addEventListener('submit', this._submitHandler);
        super.setEventListeners();
    };

    closePopup() {
        this._form.removeEventListener('submit', this._submitHandler);
        this._form.reset();
        super.closePopup();
    };
}

export { PopupWithForm };
