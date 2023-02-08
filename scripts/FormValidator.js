export default class FormValidator {
    constructor(config, popupEditForm) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._popupEditForm = popupEditForm;
        this._inputList = Array.from(popupEditForm.querySelectorAll(config.inputSelector));
        this._popupSubmit = this._popupEditForm.querySelector(this._submitButtonSelector);
       
    }

    _showInputError(popupInput) {
        const popupError = document.querySelector(`.${popupInput.id}-error`);
        popupInput.classList.add(this._inputErrorClass);
        popupError.textContent = popupInput.validationMessage;
        popupError.classList.add(this._errorClass);
    }

    _hideInputError(popupInput){
        const popupError = document.querySelector(`.${popupInput.id}-error`);
        popupInput.classList.remove(this._inputErrorClass);
        popupError.classList.remove(this._errorClass);
        popupError.textContent = "";
        
    }

    _isValid(popupInput)  {
        if (!popupInput.validity.valid) {
            this._showInputError(popupInput);
        } else {
            this._hideInputError(popupInput);
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((popupInput) => {
            return !popupInput.validity.valid;
        });
    }

    _toggleButtonState(inputList, popupSubmit)  {
        
        
          if(this._hasInvalidInput(inputList)) {
            this._popupSubmit.classList.add(this._inactiveButtonClass);
            popupSubmit.disabled = 'disabled';
        } else {
            popupSubmit.classList.remove(this._inactiveButtonClass);
            popupSubmit.disabled = '';  
        }
    }
// отдельный  метод для очистки ошибок и управления кнопкой
   /* resetValidation() {
        this._toggleButtonState();// <== управляем кнопкой ==
  
        this._inputList.forEach((popupInput) => {
          this._hideInputError(popupInput)// <==очищаем ошибки ==
        });
  
      }*/
  

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._popupSubmit); //this &
    

        this._inputList.forEach((popupInput) => {
             popupInput.addEventListener('input', () => {
             this._isValid(popupInput);
    
             this._toggleButtonState(this._inputList, this._popupSubmit); //this
         });
      });

      this._popupEditForm.addEventListener('reset', () => {
        setTimeout(() => {
            this._toggleButtonState(this._inputList, this._popupSubmit);
        }, 0)
    });
    }

    enableValidation = () => {
      
          this._setEventListeners();
       
    };
  

    }
