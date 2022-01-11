
class FormValidator {
    constructor(formElement, openFormButtons, settings) {
        this._formElement = formElement;
        this._settings = settings;
        this._openFormButtons = openFormButtons;
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    };

    _showInputError(inputElement, validationMessage, errorElement) {
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = validationMessage;
    };

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, errorElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage, errorElement);
        }};

    _toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();
            this._formSubmitButton.disabled = !isFormValid
            this._formSubmitButton.classList.toggle(this._settings.inactiveButtonClass, !isFormValid);
    };

    _inputEventListener(inputElement) {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
    };

    hideErrorMessages() {
        this._inputsList.forEach(element => {
            element.classList.remove(this._settings.inputErrorClass);
        });
        this._errorsList = Array.from(this._formElement.querySelectorAll(`${this._settings.inputSelector}-error`));
        this._errorsList.forEach(element => {
            element.textContent = '';
            element.classList.remove(this._settings.errorClass);
        });
    };

    _setEventListeners() {
        // this._formElement.addEventListener('reset', () => {
        //     this.hideErrorMessages();
        // });
        this._formSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        this._openFormButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();

        this._inputsList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._inputEventListener(inputElement);
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}

export { FormValidator };