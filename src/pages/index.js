import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api.js";

import { validityConfig } from "../scripts/utils/config.js";
import { name, job, editButton, addButton, formEditProfile, addCardForm, avatarForm, avatarButton } from "../scripts/utils/constants.js";
import './index.css';

const token = 'cd258dfe-1ea2-4752-b026-d46a9a2668de';
const cohortId = 'cohort-34';

const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
    },
});

const profileData = new UserInfo(
    {name: '.profile__info-title',
        about: '.profile__info-subtitle',
        avatar: '.profile__avatar'});

api.getUserInfoFromServer()
    .then(res => {
        profileData.setUserInfo({name: res.name, about: res.about, id: res._id})
        profileData.setUserAvatar(res.avatar)
        return profileData.getUserInfo()})
    .catch(err => `При загрузке данных о пользователе произошла ошибка: ${err}`)

api.getCardsFromServer()
    .then(res => res.forEach(item => {
       // console.log(item);
        const card = createCard(item);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement)}))
    .catch(err => `При загрузке карточек с сервера произошла ошибка: ${err}`);

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const editAvatarForm = new FormValidator(avatarForm, validityConfig);
editAvatarForm.enableValidation();
addNewCardForm.toggleButtonState();

function saveUserProfileOnServer(userData) {
    profilePopup.toggleButtonName(true);
    api.patchUserInfo(userData)
        .then(res => {
            profileData.setUserInfo({name: res.name, about: res.about, id: res._id});
        })
        .catch(err => console.log(`При отправке данных пользователя на сервер возникла ошибка: ${err}`))
        .finally(() => {
            profilePopup.toggleButtonName(false);
            profilePopup.closePopup()});
}

function handleDeleteCard(cardId, popup) {
    api.deleteCardFromServer(cardId)
        .catch(err => `При удалении карточки возникла ошибка ${err}`)
        .finally(() => popup.closePopup());
}

const createCard = item => new Card(item,'#element-template', profileData.getUserInfo().id, {
    handleCardClick: card => zoomCardPopup.openPopup(card),
    handleDeleteCard: (cardId, popup) => handleDeleteCard(cardId, popup),
    handleLikeCard: card => {}
});

const profilePopup = new PopupWithForm('.popup_profile',item => {
    saveUserProfileOnServer(item);
});

function patchAvatar(imageLink) {
    editAvatarPopup.toggleButtonName(true);
    api.patchUserAvatar(imageLink)
        .then(res => {
            profileData.setUserAvatar(res.avatar);
            profileData.setUserId(res._id);
        })
        .catch(err => {`При отправке аватара на сервер возникла ошибка: ${err}`})
        .finally(() => {
            editAvatarPopup.toggleButtonName(false);
            editAvatarPopup.closePopup();
            editAvatarForm.toggleButtonState()});
}

const editAvatarPopup = new PopupWithForm('.popup_avatar',item => {
    patchAvatar(item);
});

profilePopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const cardList = new Section('.elements');

const addCardPopup = new PopupWithForm('.popup_elements',item => {
    api.addCardToServer({name: item.name, link: item.link})
        .then(res => {
            const card = createCard(res);
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        }).finally(() => {
        addCardPopup.closePopup();
        addNewCardForm.toggleButtonState();
    });
});
addCardPopup.setEventListeners();

addButton.addEventListener('click',() => {
    addNewCardForm.hideErrorMessages();
    addCardPopup.openPopup();
});

editButton.addEventListener('click',() => {
    const userData = profileData.getUserInfo();
    console.log("3",profileData.getUserInfo())
    name.value = userData.name;
    job.value = userData.about;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    profilePopup.openPopup();
});


avatarButton.addEventListener('click',() => {
    editAvatarPopup.openPopup();
    editAvatarPopup.setEventListeners();
});
