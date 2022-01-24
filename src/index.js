import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

import { validityConfig } from "../scripts/utils/config.js";
import { editButton, name, job, addButton, formEditProfile,
    addCardForm, addCardFormImageSrc, addCardFormPlaceName, initialCards, } from "../scripts/utils/constants.js";

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const profileData = new UserInfo({userName: '.profile__info-title', userOccupation: '.profile__info-subtitle'})

const profilePopup = new PopupWithForm('.popup_profile',item => {
    profileData.setUserInfo(item)
    profilePopup.closePopup();
});
profilePopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const cardList = new Section({ items: initialCards, renderer: (cardItem) => {
        const element = new Card(cardItem, '#element-template',{handleCardClick: card => zoomCardPopup.openPopup(card)});
        const cardElement = element.generateCard();
        cardList.addItem(cardElement);
}},'.elements');

cardList.renderItems();

const addCardPopup = new PopupWithForm('.popup_elements',  handleAddCard);
addCardPopup.setEventListeners();


function handleAddCard() {
    const newCardInput = {name: addCardFormPlaceName.value, link: addCardFormImageSrc.value};
    const card = new Card(newCardInput,'#element-template',{handleCardClick: card => zoomCardPopup.openPopup(card)});
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addCardPopup.closePopup();
}


addButton.addEventListener('click',() => {
    addNewCardForm.hideErrorMessages();
    addCardPopup.openPopup();
});

editButton.addEventListener('click',() => {
    profileData.getUserInfo()
    name.value = profileData.getUserInfo().profile_info_title;
    job.value = profileData.getUserInfo().profile_info_subtitle;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    profilePopup.openPopup();
});
