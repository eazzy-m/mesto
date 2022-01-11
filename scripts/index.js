import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { popupOpen, popupClose } from "./popup.js"
import { validityConfig } from "./config.js";
import {
    popupEditProfile, profileSubtitle, exitZoomImageButton, editButton, elements, name, job,
    exitElementsButton, addButton, saveButton, openFormButtonsList, formsList, profileTitle, addCardForm,
    addCardFormImageSrc, addCardFormPlaceName, popupAddCards, exitProfileButton, initialCards, popupZoomImage
} from "./constants.js"

const createCard = (evt) => {
    evt.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    }
    const card = new Card(cardInfo, '#element-template');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
};

const showEditProfileForm = () => {
    popupOpen(popupEditProfile);
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
};

const submitProfileInfo = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubtitle.textContent = job.value;
    popupOpen(popupEditProfile);
    saveButton.reset()
    popupClose(popupEditProfile);
};

const renderDefaultCards = () => {
    elements.innerHTML = '';
    initialCards.forEach((item) => {
        const card = new Card(item, '#element-template');
        const cardElement = card.generateCard();
        elements.append(cardElement);
    });
};

renderDefaultCards();

addCardForm.addEventListener('submit',(evt) => {
    createCard(evt)
    addCardFormPlaceName.value = '';
    addCardFormImageSrc.value = '';
    popupClose(popupAddCards);
    const formSubmit = popupAddCards.querySelector('.form__submit');
    if (formSubmit) {
        formSubmit.classList.add('form__submit_inactive');
        formSubmit.disabled = true;
    }
});

const setFormValidation = (formElement) => {
    const formValidator = new FormValidator(formElement, openFormButtonsList, validityConfig);
    formValidator.enableValidation();
}

formsList.forEach(form => {
    setFormValidation(form);
})

addButton.addEventListener('click', () => popupOpen(popupAddCards));

editButton.addEventListener('click', showEditProfileForm);

exitProfileButton.addEventListener('click', () => popupClose(popupEditProfile));

exitElementsButton.addEventListener('click',() => popupClose(popupAddCards));

exitZoomImageButton.addEventListener('click',() => popupClose(popupZoomImage));

saveButton.addEventListener('submit', submitProfileInfo);
