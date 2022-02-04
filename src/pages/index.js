import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api.js";

import { validityConfig } from "../scripts/utils/config.js";
import { name, job, editButton, addButton, formEditProfile, addCardForm, avatarForm, avatarButton, initialCards } from "../scripts/utils/constants.js";
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

const editProfileForm = new FormValidator(formEditProfile, validityConfig);
editProfileForm.enableValidation();

const addNewCardForm = new FormValidator(addCardForm, validityConfig);
addNewCardForm.enableValidation();
addNewCardForm.toggleButtonState();

const editAvatarForm = new FormValidator(avatarForm, validityConfig);
editAvatarForm.enableValidation();
editAvatarForm.toggleButtonState();

const profileData = new UserInfo({name: '.profile__info-title', about: '.profile__info-subtitle', avatar: '.profile__avatar'});

const cardList = new Section('.elements', initialCards,item => addCardToPage(item));

const createCard = item => new Card(item,'#element-template', profileData.getUserInfo(), {
    handleCardClick: card => zoomCardPopup.openPopup(card),
    handleDeleteCard: (card) => handleDeleteCard(card),
    handleLikeCard: card => handleLikeCard(card)
});

const addCardToPage = item => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement)
}

api.getDefaultData()
    .then(([userData, cards]) => {
        profileData.setUserInfo({name: userData.name, about: userData.about, id: userData._id, avatar: userData.avatar})
        cards.forEach(item => addCardToPage(item))})
    .catch(err => {
        alert(`При загрузке данных с сервера возникла ${err}`);
        cardList.renderItems();
    });

const popupConfirm = new PopupWithForm('.popup_confirm');
popupConfirm.setEventListeners();

function handleDeleteCard(card) {
    popupConfirm.setSubmitCallback(() => {
        popupConfirm.toggleButtonName(true, 'Подождите...');
        api.deleteCardFromServer(card.id)
            .then(() => {
                card.removeCard();
                popupConfirm.closePopup()})
            .catch(err => alert(`При удалении карточки возникла ${err}`))
            .finally(() => popupConfirm.toggleButtonName(false, 'Да'));
    })
    popupConfirm.openPopup();
}

function handleLikeCard(card) {
    api.changeLikeCard(card.id, card.isLiked())
        .then(data => card.updateLikeCounter(data))
        .catch(err => alert(`При обновлении лайка карточки возникла ${err}`));
}

function saveUserProfileOnServer(userData) {
    profilePopup.toggleButtonName(true, 'Сохранение...');
    api.patchUserInfo(userData)
        .then(res => {
            profileData.setUserInfo({name: res.name, about: res.about, id: res._id, avatar: res.avatar});
            profilePopup.closePopup()})
        .catch(err => alert(`При обновлении данных пользователя возникла ${err}`))
        .finally(() => profilePopup.toggleButtonName(false, 'Cохранить'));
}

const profilePopup = new PopupWithForm('.popup_profile', item => {
    saveUserProfileOnServer(item);
});
profilePopup.setEventListeners();


function patchAvatar(imageLink) {
    editAvatarPopup.toggleButtonName(true, 'Сохранение...');
    api.patchUserAvatar(imageLink)
        .then(res => {
            profileData.setUserAvatar(res.avatar);
            editAvatarPopup.closePopup();
            editAvatarForm.toggleButtonState()})
        .catch(err => alert(`При обновлении аватара возникла ${err}`))
        .finally(() => editAvatarPopup.toggleButtonName(false, 'Cохранить'));
}

const editAvatarPopup = new PopupWithForm('.popup_avatar',item => patchAvatar(item));
editAvatarPopup.setEventListeners();

const zoomCardPopup = new PopupWithImage('.popup_zoom-image');
zoomCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_elements',item => {
    addCardPopup.toggleButtonName(true, 'Сохранение...')
    api.addCardToServer({name: item.name, link: item.link})
        .then(res => {
            addCardToPage(res);
            addCardPopup.closePopup()})
        .catch(err => alert(`При добавлении карточки возникла ${err}`))
        .finally(() => {
            addCardPopup.toggleButtonName(false, 'Создать')
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
