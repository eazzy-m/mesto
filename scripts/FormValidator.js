
class FormValidator {
    constructor(formElement, openFormButtons, settings) {
        this._formElement = formElement;
        this._settings = settings;
        this._openFormButtons = openFormButtons;
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    };

    _showInputError(inputElement, validationMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}` + '-error');
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = validationMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}` + '-error');
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    };

    toggleButtonState() {
        this._formSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        const isFormValid = this._formElement.checkValidity();
            this._formSubmitButton.disabled = !isFormValid;
            this._formSubmitButton.classList.toggle(this._settings.inactiveButtonClass, !isFormValid);
    };

    _setEventListeners() {
        this._inputsList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    hideErrorMessages() {
        this._inputsList.forEach(element => {
            this._hideInputError(element);
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}

export { FormValidator };