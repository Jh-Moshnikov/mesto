const editButton = document.querySelector(".profile_edit-button");
const popupCloseButton = document.querySelector(".popup_close");
const popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile_name");
let profileOccupation = document.querySelector(".profile_occupation");
// Находим форму в DOM
let formElement = document.querySelector('.popup_container'); 
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup_edit-profile-name');
let jobInput = document.querySelector('.popup_edit-profile-occupation');

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
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
    popupClose();
}
editButton.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupClose); 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 