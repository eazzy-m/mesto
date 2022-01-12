const popupOpen = (popup) => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', popupCloseByEcs);
    document.addEventListener('mousedown', popupCloseByMousedown);
};

const popupCloseByEcs = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_open');
        popupClose(popup);
    }
};

const popupCloseByMousedown = (evt) => {
    if (evt.target.classList.contains('popup_open')) {
        const popup = document.querySelector('.popup_open');
        popupClose(popup);
    }
};

const popupClose = (popup) => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', popupCloseByEcs);
    document.removeEventListener('mousedown', popupCloseByMousedown);
};

export { popupOpen, popupClose };