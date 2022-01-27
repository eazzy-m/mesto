import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import {Api} from "../scripts/components/Api.js";

import { validityConfig } from "../scripts/utils/config.js";
import { name, job, editButton, addButton, formEditProfile, addCardForm, initialCards, avatarButton } from "../scripts/utils/constants.js";
import './index.css';
import {toArray} from "core-js/internals/async-iterator-iteration";

const token = 'cd258dfe-1ea2-4752-b026-d46a9a2668de';
const cohortId = 'cohort-34';

const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
    },
});

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const profileData = new UserInfo({name: '.profile__info-title', about: '.profile__info-subtitle'})

const profilePopup = new PopupWithForm('.popup_profile',item => {
    profileData.setUserInfo(item)
    profilePopup.closePopup();
});
profilePopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const createCard = item => new Card(item,'#element-template',{handleCardClick: card => zoomCardPopup.openPopup(card)});

const cardList = new Section({ renderer: item => {
        cardList.addItem(item);
    }},'.elements');

api.getDefaultCards()
    .then(res => res.forEach(item => {
        const card = createCard(item)
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }));

const addCardPopup = new PopupWithForm('.popup_elements',item => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addCardPopup.closePopup();
    addNewCardForm.toggleButtonState();
});
addCardPopup.setEventListeners();

addButton.addEventListener('click',() => {
    addNewCardForm.hideErrorMessages();
    addCardPopup.openPopup();
});

editButton.addEventListener('click',() => {
    const userData = profileData.getUserInfo();
    name.value = userData.name;
    job.value = userData.about;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    profilePopup.openPopup();
});

avatarButton.addEventListener('click',() => {
    const editAvatarPopup = new PopupWithForm('.popup_avatar',() => {
        //
        editAvatarPopup.closePopup();
    });
    editAvatarPopup.openPopup();
    editAvatarPopup.setEventListeners();
});