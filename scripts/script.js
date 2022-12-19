
// находим кнопки редактирования 
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');

// находим кнопки закрытия попапов
const popupCloseEditProfile = document.querySelector(".popup__close_edit-profile");
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
const formEditProfile = popupProfile.querySelector('.popup__form_edit-profile'); 
const formCardSubmit = document.querySelector('.popup__form_submitCard');
// Находим поля форм в DOM
const nameInput = document.querySelector('.popup__edit_change_name');
const jobInput = document.querySelector('.popup__edit_change_occupation'); 
const cardName = document.querySelector('.popup__edit_submit-cardName');
const cardLink = document.querySelector('.popup__edit_submit-cardLink');
// ищу в dom попап с фото
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// присваиваем значения инпутов в окне редактирования профиля
function saveValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
};

//закрытие попапа кнопкой esc
const handleKeyEscape = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

//закрытие попапа клиеом на оверлэй
function closePoppupClickOverlay(evt) {
  if(!evt.target.closest(".popup_close-by-overlay")) { //popup__container
    closePopup(evt.target.closest(".popup"));
  }
  };

// объединненная функция открытия попапов
function openPopup(arg) {
  arg.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyEscape);
  arg.addEventListener('mousedown', closePoppupClickOverlay);
};

//единая функция закрытия попапов
function closePopup(arg) {
  arg.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyEscape);
  arg.removeEventListener('mousedown', closePoppupClickOverlay);
};


// вешаем слушатели на кнопки(редактировать профиль, добавить фото)
editButton.addEventListener('click', function() {
  openPopup(popupProfile);
  saveValues();
});

addButton.addEventListener('click', function() {
  openPopup(popupSubmitCard);
  toggleButtonState;
});

//вешаем слушателя на кнопки закрытия попапов(редактирования профиля, добавления фото, увелечения фото)
popupCloseEditProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

popupCloseSubmitCard.addEventListener('click', function() {
  closePopup(popupSubmitCard);
});

popupCloseImageWide.addEventListener('click', function() {
  closePopup(popupImageOpened);
});

// Обработчик «отправки» формы
 function submitEditedProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы                                
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup(popupProfile);
}
// добавление новой карточки пользователем на страницу
// formSubmitCard
const submitNewCard = (evt) => {
 evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы  
 const newCard = {title: cardName.value, link: cardLink.value};
 elementsContainer.prepend(generateElement(newCard));
 closePopup(popupSubmitCard);
 formCardSubmit.reset();
 
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» для редактирования профиля 
formEditProfile.addEventListener('submit', submitEditedProfile); 
// и для добавления новой карточки
formCardSubmit.addEventListener('submit', submitNewCard);

// возможность ставить лайк
const handleLikeCard = (event) => {
  event.target.classList.toggle('element__like-button_active'); 
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
    // присваиваю  значения из карточки при клике (вешаю слушатель)
    image.addEventListener('click', () => {
       popupImage.src = dataElement.link;
       popupImage.alt = dataElement.title;
       popupImageCaption.textContent = dataElement.title;
       openPopup(popupImageOpened);
    });
    return newElement;
    };


// добавление карточки  
    const renderElement =(dataElement) => {
      elementsContainer.prepend(generateElement(dataElement));
    };
    
// перебираем массив 
    initialElements.forEach((dataElement) => {
    renderElement(dataElement);
    });
