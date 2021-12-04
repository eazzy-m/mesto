const container = document.querySelector('.page');

const editButton = container.querySelector('.edit-button');
const addButton = container.querySelector('.add-button');
const exitProfileButton = container.querySelector('.exit-button_popup_profile');
const exitElementsButton = container.querySelector('.exit-button_popup_elements');
const exitZoomImageButton = container.querySelector('.exit-button_zoom-image-popup');
const saveButton = container.querySelector('.edit-profile-form');


const popupEditProfile = container.querySelector('.popup_profile');
const popupAddCards = container.querySelector('.popup_elements');
const popupZoomImage = container.querySelector('.popup_zoom-image');

const name = container.querySelector('#title-input');
const job = container.querySelector('#subtitle-input');
const profileTitle = container.querySelector('.profile__info-title');
const profileSubtitle = container.querySelector('.profile__info-subtitle');
const addCardForm = container.querySelector('.add-card-form');
const addCardFormPlaceName = container.querySelector('#place-input');
const addCardFormImageSrc = container.querySelector('#url-input');

const cardTemplate = document.querySelector('#element-template').content;
const elements = container.querySelector('.elements');

const figureImg = container.querySelector('.popup__figure-img');
const figcaption = container.querySelector('.popup__figcaption');

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


function cardsBuilder(element) {
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
        figcaption.textContent= img.alt;
    })

    return card;
}

function showDefaultCards(card) {
    const defaultCards = cardsBuilder(card);
    elements.append(defaultCards)
}

initialCards.forEach(showDefaultCards);

function createCard(evt) {
    evt.preventDefault();
    const cardInfo = {
        name: addCardFormPlaceName.value,
        link: addCardFormImageSrc.value,
    }
    const newCards = cardsBuilder(cardInfo);
    elements.prepend(newCards);
}


addCardForm.addEventListener('submit', function (evt) {
    createCard(evt)
    addCardFormPlaceName.value = '';
    addCardFormImageSrc.value = '';
    popupClose(popupAddCards);
});

function showEditProfileForm() {
    popupOpen(popupEditProfile);
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
}

function showAddCardPopup() {
   popupOpen(popupAddCards);
}

function popupOpen(popup) {
    popup.classList.add('popup_open');
}

const closePopupByEcs = (evt) => {
    if (evt.key === 'Escape') {
        const popup = container.querySelector('.popup_open');
        popupClose(popup);
    }
}
const closePopupByMousedown = (evt) => {
    if (evt.target.classList.contains('popup_open')) {
        const popup = container.querySelector('.popup_open')
        popupClose(popup);
    }
};

container.addEventListener('keydown', closePopupByEcs);
container.addEventListener('mousedown', closePopupByMousedown);

function popupClose(popup) {
    popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    if (name.value && job.value) {
        profileTitle.textContent = name.value;
        profileSubtitle.textContent = job.value;
        popupOpen(popupEditProfile);
        name.value = '';
        job.value = '';
    }
    popupClose(popupEditProfile);
}

exitZoomImageButton.addEventListener('click', function () {
    popupClose(popupZoomImage);
})

addButton.addEventListener('click', showAddCardPopup);

editButton.addEventListener('click', showEditProfileForm);

exitProfileButton.addEventListener('click', function () {
    popupClose(popupEditProfile);
});

exitElementsButton.addEventListener('click', function () {
    popupClose(popupAddCards);
});

saveButton.addEventListener('submit', formSubmitHandler);





