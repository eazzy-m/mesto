import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { popupOpen, popupClose } from "./popup.js"
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
    const newCard = new Card(card, '#element-template');
    return newCard.generateCard();
};

const renderDefaultCards = () => {
    elements.innerHTML = '';
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
    popupOpen(popupEditProfile);
    formEditProfile.reset();
    popupClose(popupEditProfile);
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
    popupClose(popupAddCards);
};

addButton.addEventListener('click',() => {
    addCardForm.reset();
    addNewCardForm.toggleButton();
    addNewCardForm.hideErrorMessages();
    popupOpen(popupAddCards)
});

editButton.addEventListener('click', () => {
    editProfileForm.hideErrorMessages();
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    popupOpen(popupEditProfile);
});

exitProfileButton.addEventListener('click',() => popupClose(popupEditProfile));

exitElementsButton.addEventListener('click',() => popupClose(popupAddCards));

exitZoomImageButton.addEventListener('click',() => popupClose(popupZoomImage));

addCardForm.addEventListener('submit', submitAddCardForm);

formEditProfile.addEventListener('submit', submitProfileInfo);
