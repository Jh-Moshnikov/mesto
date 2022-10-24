const editButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");
// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); 
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__edit-profile-name');
let jobInput = document.querySelector('.popup__edit-profile-occupation');

function popupOpened() {
    popup.classList.add("popup__opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent; 
}
function popupClose() {
    popup.classList.remove("popup__opened");
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
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
    popupClose();
}
editButton.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupClose); 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 