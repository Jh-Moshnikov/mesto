*
// Находим форму в DOM
let formElement = document.querySelector('.popup_edit-form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup_edit-profile-name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup_edit-profile-occupation');// Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
 function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы//                                  
    nameInput = nameInput.value // Получите значение полей jobInput и nameInput из свойства value//
    jobInput = jobInput.value
  
    // Выберите элементы, куда должны быть вставлены значения полей
   
   // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); */