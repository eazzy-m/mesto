let container = document.querySelector('.page');
let editButton = container.querySelector('.edit-button');
let exitButton = container.querySelector('.exit-button');
let saveButton = container.querySelector('.form');
let popup = container.querySelector('.popup');
let name = container.querySelector('.form__item_info_title');
let job = container.querySelector('.form__item_info_subtitle');

let profileTitle = container.querySelector('.profile__info-title');
let profileSubtitle = container.querySelector('.profile__info-subtitle');
let addButton = container.querySelector('.add-button');
let editProfileForm = container.querySelector('.form_close');
let addCardForm = container.querySelector('.add-form_close');

let likeButton = container.querySelector('.like-button');

let addCardButton = container.querySelector('.add-card-form-button');
let elements = container.querySelector('.elements'); // analog songsContainer


let cardTextDescription = container.querySelector('.element__text');
let cardImage = container.querySelector('.element__mask-group');




function showPopup() {
    popup.classList.remove('popup_close');
}

function showEditProfileForm() {
    showPopup();
    editProfileForm.classList.remove('form_close');
    name.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
}

function showAddCardForm() {
    showPopup();
    addCardForm.classList.remove('add-form_close');
}

function closeForm() {
    popup.classList.add('popup_close');
    if (editProfileForm.classList.contains('form_close')) {
        addCardForm.classList.add('add-form_close');
    } else {
        editProfileForm.classList.add('form_close');
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    if (name.value && job.value) {
        profileTitle.textContent = name.value;
        profileSubtitle.textContent = job.value;
        closeForm();
        name.value = '';
        job.value = '';
    }
}

function addNewElement(placeName, placeImageSource) {
    const cardTemplate = document.querySelector('#element-template').content;
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('like-button_active');
    });
    element.querySelector('.element__text').textContent = placeName;
    element.querySelector('.element__mask-group').src = placeImageSource;

    elements.prepend(element);
    closeForm()
}

addCardButton.addEventListener('click', function () {
    let placeName = document.querySelector('.form__item_place-name');
    let placeImageSource = document.querySelector('.form__item_place-image-source');
    addNewElement(placeName.value, placeImageSource.value);
    placeName.value = '';
    placeImageSource.value = '';
});

addButton.addEventListener('click', showAddCardForm);
editButton.addEventListener('click', showEditProfileForm);
exitButton.addEventListener('click', closeForm);
saveButton.addEventListener('submit', formSubmitHandler);




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

