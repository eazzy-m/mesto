import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { popupOpening, popupClosing } from "./popup.js"
import { validityConfig } from "./config.js";
import {
    popupEditProfile, profileSubtitle, exitZoomImageButton, editButton, elements, name, job,
    exitElementsButton, addButton, formEditProfile, openFormButtonsList, profileTitle, addCardForm,
    addCardFormImageSrc, addCardFormPlaceName, popupAddCards, exitProfileButton, initialCards, popupZoomImage
} from "./constants.js";

const editProfileForm = new FormValidator(formEditProfile, openFormButtonsList, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, openFormButtonsList, validityConfig);
addNewCardForm.enableValidation();

const createCard = (card) => {
    const newCard = new Card(card,'#element-template');
    return newCard.generateCard();
};

const renderDefaultCards = () => {

    initialCards.forEach((item) => {
        const newCard = createCard(item);
        elements.append(newCard);
    });
};

renderDefaultCards();

const submitProfileInfo = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubtitle.textContent = job.value;
    formEditProfile.reset();
    popupClosing(popupEditProfile);
};

const submitAddCardForm = (evt) => {
    evt.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    };
    const newCard = createCard(cardInfo);
    elements.prepend(newCard);
    addCardForm.reset();
    popupClosing(popupAddCards);
};

addButton.addEventListener('click',() => {
    addNewCardForm.toggleButtonState();
    addNewCardForm.hideErrorMessages();
    popupOpening(popupAddCards);
});

editButton.addEventListener('click',() => {
    editProfileForm.hideErrorMessages();
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    popupOpening(popupEditProfile);
});

exitProfileButton.addEventListener('click',() => popupClosing(popupEditProfile));

exitElementsButton.addEventListener('click',() => popupClosing(popupAddCards));

exitZoomImageButton.addEventListener('click',() => popupClosing(popupZoomImage));

addCardForm.addEventListener('submit', submitAddCardForm);

formEditProfile.addEventListener('submit', submitProfileInfo);
