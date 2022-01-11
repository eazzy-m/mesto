export const editButton = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');
export const exitProfileButton = document.querySelector('.exit-button_popup_profile');
export const exitElementsButton = document.querySelector('.exit-button_popup_elements');
export const saveButton = document.querySelector('.edit-profile-form');
export const popupEditProfile = document.querySelector('.popup_profile');
export const popupAddCards = document.querySelector('.popup_elements');
export const name = document.querySelector('#title-input');
export const job = document.querySelector('#subtitle-input');
export const profileTitle = document.querySelector('.profile__info-title');
export const profileSubtitle = document.querySelector('.profile__info-subtitle');
export const addCardForm = document.querySelector('.add-card-form');
export const addCardFormPlaceName = document.querySelector('#place-input');
export const addCardFormImageSrc = document.querySelector('#url-input');
export const cardTemplate = document.querySelector('#element-template').content;
export const elements = document.querySelector('.elements');
export const formsList = Array.from(document.forms);
export const openFormButtonsList = Array.from(document.querySelectorAll('.button-open-form'));

export const exitZoomImageButton = document.querySelector('.exit-button_zoom-image-popup');
export const popupZoomImage = document.querySelector('.popup_zoom-image');
export const figureImg = document.querySelector('.popup__figure-img');
export const figcaption = document.querySelector('.popup__figcaption');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];