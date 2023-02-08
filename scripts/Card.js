export default class Card {
    constructor(dataElement, elementTemplate, handleCardClick) {
      this._title = dataElement.title;
      this._link = dataElement.link;
      this._elementTemplate = elementTemplate;
      this._handleCardClick = handleCardClick;
  } 
  
    _getTemplate() {
      const newCard = document
        .querySelector(this._elementTemplate)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return newCard;
  } 
  
    generateCard() {
      this._element = this._getTemplate();
  
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__title').textContent = this._title;
  
      this._setEventListeners();
  
      return this._element;
  }
  
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._handleLikeCard();
      });
  
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._handleDeleteCard();
      });
  
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleCardClick(this._link, this._title);
      });
    }
  
    _handleLikeCard() {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }
  
    _handleDeleteCard () {
      this._element.closest('.element').remove();
     // this._newCard.remove();
      this._newCard = null;
    }
  
   }
   


        



 