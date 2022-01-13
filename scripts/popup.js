const popupOpening = (popup) => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', popupClosingByEcs);
    document.addEventListener('mousedown', popupClosingByMousedown);
};

const popupClosingByEcs = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_open');
        popupClosing(popup);
    }
};

const popupClosingByMousedown = (evt) => {
    if (evt.target.classList.contains('popup_open')) {
        const popup = document.querySelector('.popup_open');
        popupClosing(popup);
    }
};

const popupClosing = (popup) => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', popupClosingByEcs);
    document.removeEventListener('mousedown', popupClosingByMousedown);
};

export { popupOpening, popupClosing };