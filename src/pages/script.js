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
 
 // Находим поля форм в DOM
 const nameInput = document.querySelector('.popup__edit_change_name');
 const jobInput = document.querySelector('.popup__edit_change_occupation'); 
 


 const popupWithImage = new PopupWithImage('.popup_image-wide-opacity');
    popupWithImage.setEventListeners();
    const handleCardClick = (link, title) =>{
    popupWithImage.open(link, title);
 };


 const  popupWithSubmitCard = new  PopupWithForm({popupSelector: '.popup_submitCard', submitEditedProfile: (inputValues) => {
    submitNewCard(inputValues); 
 }});

   popupWithSubmitCard.setEventListeners();

   addButton.addEventListener('click', function() {
     popupWithSubmitCard.open();
 });

 

 const user = new UserInfo({profileNameSelector: ".profile__name", profileOccupationSelector: ".profile__occupation"});
 


 const popupWithProfile = new  PopupWithForm({popupSelector: '.popup_profile', submitEditedProfile: (inputValues) => {
  submitEditedProfile(inputValues); 
  popupWithProfile.close();
 }})

 popupWithProfile.setEventListeners();

 editButton.addEventListener('click', function() {
   saveValues();
   popupWithProfile.open();
 });


  function saveValues() {
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo['profileName'];
    jobInput.value = userInfo['profileOccupation'];

  };
  
  
  // Обработчик «отправки» формы
   const submitEditedProfile = (inputValues) => {
     user.setUserInfo(Object.values(inputValues)); //стобы не добавлять новые методы, я преобразовал объект в массив
                                                    //и уже как массив вставляю в метод setUserInfo
    
  }


 // добавление новой карточки пользователем на страницу
 // formSubmitCard
 const submitNewCard = (inputValues) => { 
     cardList.addItem(createCard({title: inputValues['submit-cardName'], link: inputValues['submit-cardLink']}));
     popupWithSubmitCard.close(popupSubmitCard);
 }


 function createCard(item) {
    const card = new Card(item, '.element-template', handleCardClick);
    const newCard = card.generateCard();
  
    return newCard;
 }

 const cardList = new Section({
     items: initialElements,
     renderer: (item) => {
     cardList.addItem(createCard(item));
   },
 }, '.elements');

 cardList.renderItems();

 
 const validProfileInfo = new FormValidator(config, popupProfile);
 validProfileInfo.enableValidation();
 
 
 const validSubmitCard = new FormValidator(config, popupSubmitCard);
  validSubmitCard.enableValidation();
 
