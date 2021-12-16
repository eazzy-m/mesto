
const showInputError = (inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (inputElement, {inputErrorClass, errorClass}) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, {inputErrorClass, errorClass});
    } else {
        showInputError(inputElement, {inputErrorClass, errorClass});
    }
};


const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
   const isFormValid = formElement.checkValidity();
   buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
   buttonElement.disabled = !isFormValid;
}

const setEventListeners = (formElement, {inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass}) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, {inputErrorClass, errorClass});
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = ({formSelector,
                              inputSelector,
                              submitButtonSelector,
                              inactiveButtonClass,
                              inputErrorClass,
                              errorClass}) => {

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, {inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass});
    });
};

const validityConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

class FormValidator {

}

enableValidation(validityConfig);