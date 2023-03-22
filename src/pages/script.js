 import './index.css';
 import Card from '../components/Card.js';
 import { initialElements, config}  from '../utils/constants.js';
 import FormValidator from '../components/FormValidator.js';
 import Section from '../components/Section.js';
 import PopupWithImage from '../components/PopupWithImage.js';
 import PopupWithForm from '../components/PopupWithForm.js';
 import UserInfo from '../components/UserInfo.js';
 
 
 
 // находим кнопки редактирования 
 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector('.profile__add-button');
 
 
 // находим попапы по модификаторам
 const popupProfile = document.querySelector(".popup_profile");
 const popupSubmitCard = document.querySelector('.popup_submitCard');
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
 
 const elementsContainer = document.querySelector('.elements');

const popupWithImage = new PopupWithImage('.popup_image-wide-opacity');
  popupWithImage.setEventListeners();
 const handleCardClick = (link, title) =>{
   popupWithImage.open(link, title);
 };


 const  popupWithSubmitCard = new  PopupWithForm({popupSelector: '.popup_submitCard', submitEditedProfile: (item) => {
  submitNewCard(item);
 }});
 popupWithSubmitCard.setEventListeners();
 addButton.addEventListener('click', function() {
  popupWithSubmitCard.open('.popup_submitCard');
 });

 const user = new UserInfo({profileNameSelector: 'profileName', profileOccupationSelector: 'profileOccupation'});

 const popupWithProfile = new  PopupWithForm({popupSelector: '.popup_profile', submitEditedProfile: (data) => {
  user.setUserInfo({data})
   popupWithProfile.close()
 }})
 popupWithProfile.setEventListeners();
 editButton.addEventListener('click', function() {
  saveValues();
  popupWithProfile.open('.popup_profile');
 });

 // добавление новой карточки пользователем на страницу
 // formSubmitCard
 const submitNewCard = () => { 
  const newCard = {title: cardName.value, link: cardLink.value};
  elementsContainer.prepend(renderer(newCard));
  popupWithSubmitCard.close(popupSubmitCard);
  formCardSubmit.reset();
 }


 const cardList = new Section({
   items: initialElements,
   renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const newCard = card.generateCard();
    cardList.addItem(newCard);
   },
 }, '.elements');

 cardList.renderItems();

 
 //рендер карточки
 const renderer = (item) => {
   const card = new Card(item, '.element-template', handleCardClick);
   const newCard = card.generateCard();
   return newCard;
 }
 

 // присваиваем значения инпутов в окне редактирования профиля
 function saveValues() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileOccupation.textContent;
 };
 
 
 // Обработчик «отправки» формы
  function submitEditedProfile () {
    // evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы                                
     profileName.textContent = nameInput.value;
     profileOccupation.textContent = jobInput.value;
     popupWithProfile.close(popupProfile);
 }
 
 
 // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» для редактирования профиля 
 formEditProfile.addEventListener('submit', submitEditedProfile); 
 // и для добавления новой карточки
 //formCardSubmit.addEventListener('submit', submitNewCard);
 
 const validProfileInfo = new FormValidator(config, popupProfile);
 validProfileInfo.enableValidation();
 
 
 const validSubmitCard = new FormValidator(config, popupSubmitCard);
  validSubmitCard.enableValidation();
 
