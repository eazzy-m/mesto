
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const exitProfileButton = document.querySelector('.exit-button_popup_profile');
const exitElementsButton = document.querySelector('.exit-button_popup_elements');
const exitZoomImageButton = document.querySelector('.exit-button_zoom-image-popup');
const saveButton = document.querySelector('.edit-profile-form');


const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCards = document.querySelector('.popup_elements');
const popupZoomImage = document.querySelector('.popup_zoom-image');

const name = document.querySelector('#title-input');
const job = document.querySelector('#subtitle-input');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const addCardForm = document.querySelector('.add-card-form');
const addCardFormPlaceName = document.querySelector('#place-input');
const addCardFormImageSrc = document.querySelector('#url-input');

const cardTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

const figureImg = document.querySelector('.popup__figure-img');
const figcaption = document.querySelector('.popup__figcaption');

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
}

const showDefaultCards = (card) => {
    const defaultCards = cardsBuilder(card);
    elements.append(defaultCards)
}

initialCards.forEach(showDefaultCards);

const createCard = (evt) => {
    evt.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    }
    const newCards = cardsBuilder(cardInfo);
    elements.prepend(newCards);
}


addCardForm.addEventListener('submit',  (evt) => {
    createCard(evt)
    addCardFormPlaceName.value = '';
    addCardFormImageSrc.value = '';
    popupClose(popupAddCards);
});

const showEditProfileForm = () => {
    popupOpen(popupEditProfile);
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
}


function popupOpen(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closePopupByEcs);
    document.addEventListener('mousedown', closePopupByMousedown);
    const formSubmit = popup.querySelector('.form__submit');
    formSubmit.classList.add('form__submit_inactive');
    formSubmit.disabled = true;
}

const closePopupByEcs = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_open');
        popupClose(popup);
    }
    document.removeEventListener('keydown', closePopupByEcs);
}

const closePopupByMousedown = (evt) => {
    if (evt.target.classList.contains('popup_open')) {
        const popup = document.querySelector('.popup_open')
        popupClose(popup);
    }
};

const popupClose = (popup) => {
    popup.classList.remove('popup_open');
}

const formSubmitHandler = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = name.value;
    profileSubtitle.textContent = job.value;
    popupOpen(popupEditProfile);
    name.value = '';
    job.value = '';
    popupClose(popupEditProfile);
}

exitZoomImageButton.addEventListener('click', () => popupClose(popupZoomImage));

addButton.addEventListener('click', () => popupOpen(popupAddCards));

editButton.addEventListener('click', showEditProfileForm);

exitProfileButton.addEventListener('click', () => popupClose(popupEditProfile));

exitElementsButton.addEventListener('click',() => popupClose(popupAddCards));

saveButton.addEventListener('submit', formSubmitHandler);





