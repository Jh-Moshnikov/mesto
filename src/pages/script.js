 import './index.css';
 import Card from '../components/Card.js';
 import { initialElements, config}  from '../utils/constants.js';
 import FormValidator from '../components/FormValidator.js';
 import Section from '../components/Section.js';
 import PopupWithImage from '../components/PopupWithImage.js';
 import PopupWithForm from '../components/PopupWithForm.js';
 import UserInfo from '../components/UserInfo.js';
 import Api from '../components/Api.js';
 import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { info } from 'autoprefixer';
 
 // находим кнопки редактирования 
 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector('.profile__add-button');
 // находим попапы по модификаторам
 const popupProfile = document.querySelector(".popup_profile");
 const popupSubmitCard = document.querySelector('.popup_submitCard');
 const popupAvatar = document.querySelector('.popup_changeUserAvatar');
 const profileAvatar = document.querySelector('.profile__avatar');
 // Находим поля форм в DOM
 const nameInput = document.querySelector('.popup__edit_change_name');
 const jobInput = document.querySelector('.popup__edit_change_occupation'); 

 const popupConfirm = document.querySelector('.popup_deleteUserCard');



 let userId;

 const cardList = new Section({     
  renderer: (items) => {
  cardList.addItem(createCard(items)); 
},
}, '.elements');



function createCard(data) {  
  const card = new Card(
    { 
      name: data.name, 
      link: data.link,  
      likes: data.likes, 
      userId,
      ownerId: data.owner._id,
      id: data._id 
   }, 
   '.element-template', 
    openImage,
    async () => {
     try {
         const res = await api.like(data._id);
         card.like();
         card.setLikesBox(res);
     } catch (e) {
         console.warn(e) //Выводbv предупреждение в консоль.
     }
 },
 async () => {
   try {
       const res = await api.deletelike(data._id);
       card.deletelike();
       card.setLikesBox(res);
   } catch (e) {
       console.warn(e)
   }
 },
   () => {
      confirmPopup.open(card)
 }
 );
 
  return card.generateCard();
}


const  popupWithSubmitCard = new  PopupWithForm('.popup_submitCard', submitEditedProfile);
popupWithSubmitCard.setEventListeners();  

//async  всегда возвращает промис
async function  submitEditedProfile(data)  {
  popupWithSubmitCard.renderLoading(true, 'Сохранение...'); 
  try {
      const res = await api.addNewCard(data);
      const card = createCard(res);
      cardList.addItem(card); //addItem
      popupWithSubmitCard.close();
  } catch (err) {
      console.warn(err)
  } finally {
    popupWithSubmitCard.renderLoading(false);
  }
};


 const confirmPopup = new PopupWithConfirmation('.popup_deleteUserCard', async (card) => {
  try {
      await api.deleteCard(card._id);
      card.delete();
      confirmPopup.close();
  } catch (err) {
      console.warn(err)
  }
})
confirmPopup.setEventListeners();

const popupWithProfile = new  PopupWithForm('.popup_profile', submitProfileInfo);
popupWithProfile.setEventListeners();


const userInfo = new UserInfo({
  profileNameSelector: ".profile__name", 
  profileOccupationSelector: ".profile__occupation",
  profileAvatarSelector: '.profile__avatar'
});

async function submitProfileInfo(data) {
  popupWithProfile.renderLoading(true, 'Сохранение...');
  try {
    console.log(data);
      const res = await api.setUserInfo(data);
      userInfo.setUserInfo(res);
      popupWithProfile.close();
  } catch  (err) {
    console.warn(e);
  } finally {
    popupWithProfile.renderLoading(false);
  }
}


editButton.addEventListener('click', function() {
 // const info = userInfo.getUserInfo();
  saveValues();
 // popupWithProfile.setInputValue(info);
  popupWithProfile.open();
  validProfileInfo.resetValidation();
  
});

function saveValues() {
  const info = userInfo.getUserInfo();
  nameInput.value = info.profileName;
  jobInput.value = info.profileOccupation;

 };


 const popupWithAvatar = new  PopupWithForm('.popup_changeUserAvatar', submitChangeAvatar);
 popupWithAvatar.setEventListeners();

 async function submitChangeAvatar(data) {
  popupWithAvatar.renderLoading(true, 'Сохранение...')
  try {
    console.log(data);
    const res = await api.changeAvatar(data);
    userInfo.setAvatar(res);
    popupWithAvatar.close();
  } catch (err) {
    console.warn(err);
  } finally {
    popupWithAvatar.renderLoading(false);
  }
 }


 profileAvatar.addEventListener('click', () => {
  popupWithAvatar.open();
  validAvatarForm.resetValidation();
 })

function openImage(link, title) {
  popupWithImage.open(link, title);

}

addButton.addEventListener('click', function() {
  popupWithSubmitCard.open();
  validSubmitCard.resetValidation();
});


 
 const popupWithImage = new PopupWithImage('.popup_image-wide-opacity');
 popupWithImage.setEventListeners();
 /*const handleCardClick = (link, title) =>{
   popupWithImage.open(link, title);
 };*/

 const validProfileInfo = new FormValidator(config, popupProfile);
 validProfileInfo.enableValidation();
 
 const validSubmitCard = new FormValidator(config, popupSubmitCard);
 validSubmitCard.enableValidation();

 const validAvatarForm = new FormValidator(config, popupAvatar);
 validAvatarForm.enableValidation();


 const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
      authorization: "94497a97-fa39-4775-9861-a6f26f543596",
      "Content-Type": "application/json",
  },
})

 Promise.all([api.getUserInfo(), api.getInitialCards()])  
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardList.renderItems(cards.reverse());
  
    })
    .catch((err) => console.warn(err));



  
  

  
  
  // Обработчик «отправки» формы
 /*const submitEditedProfile = (inputValues) => {
   console.log(inputValues);
   user.setUserInfo({name: inputValues['profile-name'], occupation: inputValues['profile-occupation']});
  
  }*/


 // добавление новой карточки пользователем на страницу
 // formSubmitCard
 /*const submitNewCard = (inputValues) => { 
   cardList.addItem(createCard({title: inputValues['submit-cardName'], link: inputValues['submit-cardLink']}));
   popupWithSubmitCard.close(popupSubmitCard);
 }*/