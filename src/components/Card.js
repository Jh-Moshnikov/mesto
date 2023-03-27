export default class Card {
    constructor(data, elementTemplate, openImage, like, deletelike, deleteCard) {
      this._name = data.name;
      this._link = data.link;
      this._elementTemplate = elementTemplate;
      this._openImage = openImage;
      this._id = data.id;
      this._likes = data.likes;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._deleteCard = deleteCard;
      this._like = like;
      this._deletelike = deletelike;
     
     
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
      this._imageElement = this._element.querySelector('.element__image');
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._likeButton = this._element.querySelector('.element__like-button');
      this._likeBox = this._element.querySelector('.element__like-box');
      this._deleteButton = this._element.querySelector('.element__delete-button');
      this._likeBox.textContent = `${this._likes.length}`;
      this._setEventListeners();
      this._isLiked();
      this.isOwner();
  
      return this._element;
  }
  
   _setEventListeners() {
      
     this._likeButton.addEventListener('click', () => {
        if (this._likeButton.classList.contains('.element__like-button_active')) {
            this._deletelike();
        } else {
            this._like();
        }
    });


    




  
     this._deleteButton.addEventListener('click', () => {
        this._deleteCard(this._id);
    });
  
     this._imageElement.addEventListener('click', () => {
        this._openImage(this._link, this._name);
      });
    }
  
   isOwner() {
      if (this._userId !== this._ownerId) {
          this._deleteButton.remove();
          this._deleteButton = null;
      }
  }

  _isLiked() {
      this._likes.forEach((user) => {     
        if (user._id === this._userId) {
            this.like();
        } else {
            this.deletelike();
        }
    });
}

  like() {
      this._likeButton.classList.add("element__like-button_active");
}

deletelike() {
    this._likeButton.classList.remove("element__like-button_active");
}

  setLikesBox(res) {
    this._likeBox.textContent = `${res.likes.length}`;
}

delete() {
  this._element.remove();
  this._element = null;
}


  
   }
   


        



 