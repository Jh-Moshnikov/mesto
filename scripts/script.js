const editButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); 
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__edit-profile-name');
const jobInput = document.querySelector('.popup__edit-profile-occupation');

function popupOpened() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent; 
}
function popupClose() {
    popup.classList.remove("popup_opened");
} 

popup.addEventListener('click', function(event) { /*добавил закрытие попапа кликом за его пределами */
    if (event.target == event.currentTarget ) {
        popupClose();
    }
});

// Обработчик «отправки» формы
 function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы                                
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    popupClose();
}
editButton.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupClose); 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 