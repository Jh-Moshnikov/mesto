let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile_edit-button');
function popupOpened() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', popupOpened);
