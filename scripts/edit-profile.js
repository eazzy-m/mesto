let container = document.querySelector('.page');
let editButton = container.querySelector('.edit-button');
let exitButton = container.querySelector('.exit-button');
let saveButton = container.querySelector('.form__button');
let popup = container.querySelector('.popup');
let name = container.querySelector('.form__item_info_title');
let job = container.querySelector('.form__item_info_subtitle');
let profileTitle = container.querySelector('.profile__info-title');
let profileSubtitle = container.querySelector('.profile__info-subtitle');

function showForm() {
    popup.classList.remove('popup_close');
    name.placeholder = profileTitle.textContent;
    job.placeholder = profileSubtitle.textContent;
}

function closeForm() {
    popup.classList.add('popup_close');
}

function editProfile() {
    if (name.value && job.value) {
        profileTitle.textContent = name.value;
        profileSubtitle.textContent = job.value;
        closeForm();
        name.value = '';
        job.value = '';
    }
}

editButton.addEventListener('click', showForm);
exitButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', editProfile);
