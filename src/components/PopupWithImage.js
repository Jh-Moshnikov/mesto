import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._image = this._popup.querySelector('.popup__image');
      this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(link, title) {
      super.open();  
      this._image.src = link;
      this._image.alt = title;
      this._popupImageCaption.textContent = title;

    }
};