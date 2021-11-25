let container = document.querySelector('.page');
let editButton = container.querySelector('.edit-button');
let exitButton = container.querySelector('.exit-button');
let saveButton = container.querySelector('.edit-profile-form');
let popup = container.querySelector('.popup');
let name = container.querySelector('.form__item_info_title');
let job = container.querySelector('.form__item_info_subtitle');
const cardTemplate = document.querySelector('#element-template').content;
let profileTitle = container.querySelector('.profile__info-title');
let profileSubtitle = container.querySelector('.profile__info-subtitle');
let addButton = container.querySelector('.add-button');
let editProfileForm = container.querySelector('.form_close');
let addCardForm = container.querySelector('.add-card-form');
let elements = container.querySelector('.elements'); // analog songsContainer


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

function releaseDefaultCards(element) {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__text').textContent = element.name;
    card.querySelector('.element__mask-group').src = element.link;

    elements.append(card);
}


function addCards(evt) {
    evt.preventDefault();
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    card.querySelector('.element__text').textContent = container.querySelector('.form__item_place-name').value;
    card.querySelector('.element__mask-group').src = container.querySelector('.form__item_place-image-source').value;
    createCard(card);
    elements.prepend(card);
    container.querySelector('.form__item_place-name').value = '';
    container.querySelector('.form__item_place-image-source').value = '';

    closeForm();
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
    const deleteCard = obj.querySelector('.remove-element-button');
    deleteCard.addEventListener('click' ,function (evt) {
        const element = deleteCard.closest('.element');
        element.remove();
    })
    // zoom
    // const zoom = obj.querySelector('.element__mask-group');

}

addCardForm.addEventListener('submit', addCards);

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



addButton.addEventListener('click', showAddCardForm);
editButton.addEventListener('click', showEditProfileForm);
exitButton.addEventListener('click', closeForm);
saveButton.addEventListener('submit', formSubmitHandler);






