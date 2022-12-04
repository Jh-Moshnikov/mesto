const initialElements = [
    {
      title: 'Алтай',
      link: 'images/Altai.png'
    },
    {
      title: 'Архангельск',
      link: 'images/Arkhangelsk.png'
    },
    {
      title: 'Канада',
      link: 'images/Canada.png'
    },
    {
      title: 'Домбай',
      link: 'images/dombai.png'
    },
    {
      title: 'Италия',
      link: 'images/Italy.png'
    },
    {
      title: 'Норвегия',
      link: 'images/Norway.png'
    }
  ];

const editButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); 
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__edit_change_name');
const jobInput = document.querySelector('.popup__edit_change_occupation'); 
const elements = document.querySelector('.elements');


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

// шаблон карточки
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// генерация карточек
const generateElement = (dataElement) => {
    const newElement = elementTemplate.cloneNode(true);
    const title = newElement.querySelector('.element__title');
    const image = newElement.querySelector('.element__image');
    title.textContent = dataElement.title;
    image.src = dataElement.link;
    image.alt = dataElement.title;
    return newElement
    };

  // добавление карточки  
    const renderElement =(dataElement) => {
        elements.prepend(generateElement(dataElement));
    };
    
    // перебираем массив 
    initialElements.forEach((dataElement) => {
    renderElement(dataElement);
    });