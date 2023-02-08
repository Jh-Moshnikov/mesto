import Card from './Card.js';
import { initialElements, config}  from './constants.js';
import FormValidator from './validate.js';

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


//рендер карточки
const renderElement = (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  const newCard = card.generateCard();
  return newCard;
}
 
//перебираем массив
initialElements.forEach((item) => {
  elementsContainer.prepend(renderElement(item));
});

 function handleCardClick(link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupImageOpened);
 }
 
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
  if(!evt.target.closest(".popup__close-by-overlay")) { 
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
 elementsContainer.prepend(renderElement(newCard));
 closePopup(popupSubmitCard);
 formCardSubmit.reset();
 
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» для редактирования профиля 
formEditProfile.addEventListener('submit', submitEditedProfile); 
// и для добавления новой карточки
formCardSubmit.addEventListener('submit', submitNewCard);

const validProfileInfo = new FormValidator(config, popupProfile);
validProfileInfo.enableValidation();


const validSubmitCard = new FormValidator(config, popupSubmitCard);
 validSubmitCard.enableValidation();




 