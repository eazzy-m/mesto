import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { validityConfig } from "../utils/config.js";
import { profileSubtitle, editButton, elements, name, job, addButton, formEditProfile,
    profileTitle, addCardForm, addCardFormImageSrc, addCardFormPlaceName, initialCards, } from "../utils/constants.js";

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const profileData = new UserInfo({userName: '.profile__info-title', userOccupation: '.profile__info-subtitle'})

const profilePopup = new PopupWithForm('.popup_profile', (item) => {
    profileData.setUserInfo(item);
});
profilePopup.setEventListeners();

const addCardPopup = new Popup('.popup_elements');
addCardPopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const cardList = new Section({ items: initialCards, renderer: (cardItem) => {
        const element = new Card(cardItem, '#element-template',{handleCardClick: card => zoomCardPopup.openPopup(card)});
        const cardElement = element.generateCard();

        cardList.addItem(cardElement);
    }}, '.elements');

cardList.renderItems();

const createCard = card => {
    const newCard = new Card(card,'#element-template', {handleCardClick: (card) => {
        zoomCardPopup.openPopup(card);
    }});
    return newCard.generateCard();
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
    addCardPopup.closePopup();
};

addButton.addEventListener('click',() => {
    addNewCardForm.hideErrorMessages();
    addCardPopup.openPopup();
});

editButton.addEventListener('click',() => {
    profileData.getUserInfo()
    console.log(profileData.getUserInfo())
    name.value = profileData.getUserInfo().profile_info_title;
    job.value = profileData.getUserInfo().profile_info_subtitle;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    profilePopup.openPopup();
});

addCardForm.addEventListener('submit', submitAddCardForm);
