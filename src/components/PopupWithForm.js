import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitEditedProfile}) {
      super(popupSelector);
      this._submitEditedProfile = submitEditedProfile;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = this._popupForm.querySelectorAll('.popup__edit');
      this._submitButton = this._popupForm.querySelector('.popup__submit-profile-info');
      }
  
  
    _getInputValues() {
      const inputValues = {};
  
      this._inputList.forEach(input => {
        inputValues[input.name] = input.value;
      });
  
      return inputValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitEditedProfile(this._getInputValues());
        this.close();
      })
    }
  
      close() {
        super.close();
        this._popupForm.reset();
      }
  
  }
  