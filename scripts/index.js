import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
import {popupOpen, popupClose} from "./popup.js"
import {validityConfig} from "./config.js";
import {cardTemplate, popupEditProfile, profileSubtitle, figcaption, figureImg, popupZoomImage,
    exitZoomImageButton, editButton, elements, name, exitElementsButton, addButton, saveButton,
    openFormButtonsList, job, formsList, profileTitle, addCardForm, addCardFormImageSrc,
    addCardFormPlaceName, popupAddCards, exitProfileButton} from "./constants.js"

const initialCards = [
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

const cardsBuilder = (element) => {
    // cards render
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__text').textContent = element.name;
    card.querySelector('.element__mask-group').alt = element.name;
    card.querySelector('.element__mask-group').src = element.link;
    // hang like/delete/zoom

    const likeCard = card.querySelector('.like-button');
    likeCard.addEventListener('click', function (evt) {
        evt.target.classList.toggle('like-button_active');
    })

    const deleteCard = card.querySelector('.delete-element-button');
    deleteCard.addEventListener('click' ,function () {
        const element = deleteCard.closest('.element');
        element.remove();
    })

    const img = card.querySelector('.element__mask-group');
    img.addEventListener('click', function () {
        popupOpen(popupZoomImage);
        figureImg.src = img.src;
        figureImg.alt = img.alt;
        figcaption.textContent = img.alt;
    })

    return card;
};

const createCard = (evt) => {
    evt.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    }
    const card = new Card(cardInfo, '#element-template');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
};

const showEditProfileForm = () => {
    popupOpen(popupEditProfile);
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
};

const submitProfileInfo = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubtitle.textContent = job.value;
    popupOpen(popupEditProfile);
    name.value = '';
    job.value = '';
    popupClose(popupEditProfile);
};

const renderDefaultCards = () => {
    elements.innerHTML = '';
    initialCards.forEach((item) => {
        const card = new Card(item, '#element-template');
        const cardElement = card.generateCard();
        elements.append(cardElement);
    })
}

renderDefaultCards();

addCardForm.addEventListener('submit',  (evt) => {
    createCard(evt)
    addCardFormPlaceName.value = '';
    addCardFormImageSrc.value = '';
    popupClose(popupAddCards);
    const formSubmit = popupAddCards.querySelector('.form__submit');
    if (formSubmit) {
        formSubmit.classList.add('form__submit_inactive');
        formSubmit.disabled = true;
    }
});

const setFormValidation = (formElement) => {
    const formValidator = new FormValidator(formElement, openFormButtonsList, validityConfig);
    formValidator.enableValidation();
}

formsList.forEach(form => {
    setFormValidation(form);
})

addButton.addEventListener('click', () => popupOpen(popupAddCards));

editButton.addEventListener('click', showEditProfileForm);

exitProfileButton.addEventListener('click', () => popupClose(popupEditProfile));

exitElementsButton.addEventListener('click',() => popupClose(popupAddCards));

exitZoomImageButton.addEventListener('click',() => popupClose(popupAddCards));

saveButton.addEventListener('submit', submitProfileInfo);


