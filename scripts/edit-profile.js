let container = document.querySelector('.page');

let editButton = container.querySelector('.edit-button');
let addButton = container.querySelector('.add-button');
let exitProfileButton = container.querySelector('.exit-button_popup_profile');
let exitElementsButton = container.querySelector('.exit-button_popup_elements');
let exitZoomImageButton = container.querySelector('.exit-button_zoom-image');
let saveButton = container.querySelector('.edit-profile-form');


let popupEditProfile = container.querySelector('.popup_profile');
let popupAddCards = container.querySelector('.popup_elements');
let popupZoomImage = container.querySelector('.popup_zoom-image');

let name = container.querySelector('.form__item_info_title');
let job = container.querySelector('.form__item_info_subtitle');
let profileTitle = container.querySelector('.profile__info-title');
let profileSubtitle = container.querySelector('.profile__info-subtitle');
let editProfileForm = container.querySelector('.form');
let addCardForm = container.querySelector('.add-card-form');


const cardTemplate = document.querySelector('#element-template').content;
let elements = container.querySelector('.elements');
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

function addCards(evt) {
    evt.preventDefault();
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    card.querySelector('.element__text').textContent = container.querySelector('.form__item_place-name').value;
    card.querySelector('.element__mask-group').src = container.querySelector('.form__item_place-image-source').value;
    card.querySelector('.element__mask-group').alt = container.querySelector('.form__item_place-name').value;
    createCard(card);
    elements.prepend(card);
    container.querySelector('.form__item_place-name').value = '';
    container.querySelector('.form__item_place-image-source').value = '';

    closeAddCardsForm();
}

function addDefaultCards(element) {
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    card.querySelector('.element__text').textContent = element.name;
    card.querySelector('.element__mask-group').alt = element.name;
    card.querySelector('.element__mask-group').src = element.link;

    elements.append(card);

    createCard(card);
}

initialCards.forEach(addDefaultCards);

function createCard(obj) {
    // like
    obj.querySelector('.like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('like-button_active');
    })
    // delete
    const deleteCard = obj.querySelector('.delete-element-button');
    deleteCard.addEventListener('click' ,function (evt) {
        const element = deleteCard.closest('.element');
        element.remove();
    })
    // zoom
    const img = obj.querySelector('.element__mask-group');
    img.addEventListener('click', function () {
        PopupZoomImage();
    container.querySelector('.popup__figure-img').src = img.src;
    container.querySelector('.popup__figcaption').textContent= img.alt;
    })

}

function PopupEditProfile() {
    popupEditProfile.classList.add('popup_open');
}

function PopupAddCards() {
    popupAddCards.classList.add('popup_open');
}

function PopupZoomImage() {
    popupZoomImage.classList.add('popup_open');
}

function showEditProfileForm() {
    PopupEditProfile();
    editProfileForm.classList.add('form_open');
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
}

function showAddCardForm() {
    PopupAddCards();
    addCardForm.classList.add('add-form_open');
}

// function closeForm() {
//     if ( popupEditProfile.classList.contains('popup_open')) {
//         popupEditProfile.classList.remove('popup_open');
//         editProfileForm.classList.add('form_close');
//     } else if (popupAddCards.classList.contains('popup_open')) {
//         popupAddCards.classList.remove('popup_open');
//         addCardForm.classList.add('add-form_close');
//     } else if (popupZoomImage.classList.contains('popup_open')) {
//         popupZoomImage.classList.remove('popup_open');
//     }
// }

function closeProfileForm() {
    popupEditProfile.classList.remove('popup_open');
    editProfileForm.classList.remove('form_open');
}

function closeAddCardsForm() {
    popupAddCards.classList.remove('popup_open');
    addCardForm.classList.remove('add-form_open');
}

function closeZoomImage() {
    popupZoomImage.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    if (name.value && job.value) {
        profileTitle.textContent = name.value;
        profileSubtitle.textContent = job.value;
        PopupEditProfile();
        name.value = '';
        job.value = '';
    }
    closeProfileForm();
}

exitZoomImageButton.addEventListener('click', closeZoomImage)
addCardForm.addEventListener('submit', addCards);
addButton.addEventListener('click', showAddCardForm);
editButton.addEventListener('click', showEditProfileForm);
exitProfileButton.addEventListener('click', closeProfileForm);
exitElementsButton.addEventListener('click', closeAddCardsForm);
saveButton.addEventListener('submit', formSubmitHandler);






