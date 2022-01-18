const openPopup = popup => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closePopupByEcs);
    document.addEventListener('mousedown', closePopupByMousedown);
};

const closePopupByEcs = e => {
    if (e.key === 'Escape') {
        const popup = document.querySelector('.popup_open');
        closePopup(popup);
    }
};

const closePopupByMousedown = e => {
    if (e.target.classList.contains('popup_open')) {
        const popup = document.querySelector('.popup_open');
        closePopup(popup);
    }
};

const closePopup = popup => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupByEcs);
    document.removeEventListener('mousedown', closePopupByMousedown);
};

export { openPopup, closePopup };