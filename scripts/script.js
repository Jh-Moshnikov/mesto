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
      title: 'Холмогоры',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
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

  // находим кнопки редактирования 
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');

// находим кнопки закрытия попапов
const popupCloseButton = document.querySelector(".popup__close_edit-profile");
const popupCloseSubmitCard = document.querySelector('.popup__close_submitCard');
const popupCloseImageWide = document.querySelector('.popup__close_image-wide');
// находим попапы по модификаторам
const popupProfile = document.querySelector(".popup_profile");
const popupSubmitCard = document.querySelector('.popup_submitCard');
const popupImageOpened =  document.querySelector('.popup_image-opened');
// находим поля имени и рода занятий
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); 
const formCardSubmit = document.querySelector('.popup__form_submitCard');
// Находим поля форм в DOM
const nameInput = document.querySelector('.popup__edit_change_name');
const jobInput = document.querySelector('.popup__edit_change_occupation'); 
const cardName = document.querySelector('.popup__edit_submit-cardName');
const cardLink = document.querySelector('.popup__edit_submit-cardLink');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// присваиваем значения инпутов в окне редактирования профиля
function saveValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
};
// объединненная функция открытия попапов
function popupOpened(arg) {
arg.classList.add('popup_opened');
};

//единая функция закрытия попапов
function popupClose(arg) {
  arg.classList.remove('popup_opened');
};

// вешаем слушатели на кнопки(редактировать профиль, добавить фото)
editButton.addEventListener('click', function() {
  popupOpened(popupProfile);
  saveValues();
});

addButton.addEventListener('click', function() {
  popupOpened(popupSubmitCard);
});

//вешаем слушателя на кнопки закрытия попапов(редактирования профиля, добавления фото, увелечения фото)
popupCloseButton.addEventListener('click', function() {
  popupClose(popupProfile);
});

popupCloseSubmitCard.addEventListener('click', function() {
  popupClose(popupSubmitCard);
});

popupCloseImageWide.addEventListener('click', function() {
  popupClose(popupImageOpened);
});

// Обработчик «отправки» формы
 function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы                                
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    popupClose(popupProfile);
}
// добавление новой карточки пользователем на страницу
const formSubmitCard = (evt) => {
 evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы  
 const newCard = {title: cardName.value, link: cardLink.value};
 elements.prepend(generateElement(newCard));
 popupClose(popupSubmitCard);
 formCardSubmit.reset();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» для редактирования профиля 
formElement.addEventListener('submit', formSubmitHandler); 
// и для добавления новой карточки
formCardSubmit.addEventListener('submit', formSubmitCard);

// возможность ставить лайк
const handleLikeCard = (event) => {
event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
};

// удаление карточки
const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};


// генерация карточек
const generateElement = (dataElement) => {
    const newElement = elementTemplate.cloneNode(true);
    const title = newElement.querySelector('.element__title');
    const image = newElement.querySelector('.element__image');
    title.textContent = dataElement.title;
    image.src = dataElement.link;
    image.alt = dataElement.title;
    const likeButton = newElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', handleLikeCard);
    const deleteButton = newElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', handleDeleteCard);
    // ищу в dom попап с фото и присваиваю ему значения из карточки при клике (вешаю слушатель)
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    image.addEventListener('click', () => {
       popupImage.src = image.src;
       popupImage.alt = title.textContent;
       popupImageCaption.textContent = title.textContent;
       popupOpened(popupImageOpened);
    });
    return newElement;
    };


// добавление карточки  
    const renderElement =(dataElement) => {
        elements.prepend(generateElement(dataElement));
    };
    
// перебираем массив 
    initialElements.forEach((dataElement) => {
    renderElement(dataElement);
    });

