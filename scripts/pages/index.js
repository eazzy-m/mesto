import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { openPopup, closePopup } from "../utils/popup.js"
import { validityConfig } from "../utils/config.js";
import {
    popupEditProfile, profileSubtitle, exitZoomImageButton, editButton, elements, name, job,
    exitElementsButton, addButton, formEditProfile, profileTitle, addCardForm,
    addCardFormImageSrc, addCardFormPlaceName, popupAddCards, exitProfileButton, initialCards, popupZoomImage
} from "../utils/constants.js";

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const createCard = card => {
    const newCard = new Card(card,'#element-template');
    return newCard.generateCard();
};

const cardList = new Section({items: initialCards, renderer: (cardItem) => {
        const element = new Card(cardItem, '#element-template');
        const cardElement = element.generateCard();

        cardList.addItem(cardElement);
    }}, '.elements');

cardList.renderItems();

// initialCards.forEach(item => {
//     const newCard = createCard(item);
//     elements.append(newCard);
// });

const submitProfileInfo = e => {
    e.preventDefault();
    profileTitle.textContent = name.value;
    profileSubtitle.textContent = job.value;
    formEditProfile.reset();
    closePopup(popupEditProfile);
};

const submitAddCardForm = e => {
    e.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    };
    const newCard = createCard(cardInfo);
    elements.prepend(newCard);
    addCardForm.reset();
    addNewCardForm.toggleButtonState();
    closePopup(popupAddCards);
};

addButton.addEventListener('click',() => {
    addNewCardForm.hideErrorMessages();
    openPopup(popupAddCards);
});

editButton.addEventListener('click',() => {
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    openPopup(popupEditProfile);
});

exitProfileButton.addEventListener('click',() => closePopup(popupEditProfile));

exitElementsButton.addEventListener('click',() => closePopup(popupAddCards));

exitZoomImageButton.addEventListener('click',() => closePopup(popupZoomImage));

addCardForm.addEventListener('submit', submitAddCardForm);

formEditProfile.addEventListener('submit', submitProfileInfo);
