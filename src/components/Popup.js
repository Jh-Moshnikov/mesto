export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._popupCloseButton = this._popup.querySelector('.popup__close');   
      this._handleEscClose = this._handleEscClose.bind(this);
      this._closePoppupClickOverlay = this._closePoppupClickOverlay.bind(this);
  
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.addEventListener('mousedown', this._closePoppupClickOverlay);
    
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._popup.removeEventListener('mousedown', this._closePoppupClickOverlay);
    }
  
    _handleEscClose(evt) {
      if(evt.key === 'Escape') {
        this.close();
      };
    }
  
   _closePoppupClickOverlay(evt) {
      if(!evt.target.closest(".popup__close-by-overlay")) { 
        this.close();
      };
    }
  
    setEventListeners() {
      this._popupCloseButton.addEventListener('click', () => 
        this.close() 
        );

      this._popup.addEventListener('mousedown', this._closePoppupClickOverlay);  
  
    }
  
  }