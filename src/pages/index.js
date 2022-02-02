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

const profileData = new UserInfo({name: '.profile__info-title', about: '.profile__info-subtitle', avatar: '.profile__avatar'});

const cardList = new Section('.elements');

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const editAvatarForm = new FormValidator(avatarForm, validityConfig);
editAvatarForm.enableValidation();
editAvatarForm.toggleButtonState();

api.getUserInfoFromServer()
    .then(res => profileData.setUserInfo({name: res.name, about: res.about, id: res._id, avatar: res.avatar}))
    .catch(err => `При загрузке данных пользователя возникла ошибка ${err}`);

api.getCardsFromServer()
    .then(res => res.forEach(item => {
        const card = createCard(item);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement)}))
    .catch(err => `При загрузке карточек возникла ошибка ${err}`);

function handleDeleteCard(cardId, popup) {
    popup.toggleButtonName(true, 'Подождите...')
    api.deleteCardFromServer(cardId)
        .catch(err => `При удалении карточки возникла ошибка ${err}`)
        .finally(() => popup.toggleButtonName(false, 'Да'));
}

function handleLikeCard(card) {
    api.changeLikeCard(card.id, card.isLiked())
        .then(data => card.updateLikeCounter(data))
        .catch(err => console.log(`При обновлении лайка карточки возникла ошибка: ${err}`));
}

const createCard = item => new Card(item,'#element-template', profileData.getUserInfo(), {
    handleCardClick: card => zoomCardPopup.openPopup(card),
    handleDeleteCard: (cardId, popup) => handleDeleteCard(cardId, popup),
    handleLikeCard: card => handleLikeCard(card)
});

function saveUserProfileOnServer(userData) {
    profilePopup.toggleButtonName(true, 'Сохранение...');
    api.patchUserInfo(userData)
        .then(res => profileData.setUserInfo({name: res.name, about: res.about, id: res._id, avatar: res.avatar}))
        .catch(err => console.log(`При отправке данных пользователя на сервер возникла ошибка: ${err}`))
        .finally(() => {
            profilePopup.closePopup()
            profilePopup.toggleButtonName(false, 'Cохранить')});
}

const profilePopup = new PopupWithForm('.popup_profile',item => {
    saveUserProfileOnServer(item);
});
profilePopup.setEventListeners();

function patchAvatar(imageLink) {
    editAvatarPopup.toggleButtonName(true, 'Сохранение...');
    api.patchUserAvatar(imageLink)
        .then(res => {
            profileData.setUserAvatar(res.avatar)
            editAvatarForm.toggleButtonState()})
        .catch(err => console.log(`При отправке данных пользователя на сервер возникла ошибка: ${err}`))
        .finally(() => {
            editAvatarPopup.closePopup();
            editAvatarPopup.toggleButtonName(false, 'Cохранить')});
}

const editAvatarPopup = new PopupWithForm('.popup_avatar',item => patchAvatar(item));
editAvatarPopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_elements',item => {
    addCardPopup.toggleButtonName(true, 'Сохранение...')
    api.addCardToServer({name: item.name, link: item.link})
        .then(res => {
            const card = createCard(res);
            const cardElement = card.generateCard();
            cardList.addItem(cardElement)})
        .finally(() => {
            addCardPopup.toggleButtonName(false, 'Создать')
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
    name.value = userData.name;
    job.value = userData.about;
    editProfileForm.hideErrorMessages();
    editProfileForm.toggleButtonState();
    profilePopup.openPopup();
});

avatarButton.addEventListener('click',() => {
    editAvatarForm.hideErrorMessages();
    editAvatarPopup.openPopup();
});
