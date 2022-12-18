const showInputError = (popupForm, popupInput, config) => {
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(config.inputErrorClass);
    popupError.textContent = popupInput.validationMessage;
    popupError.classList.add(config.errorClass);

};

const hideInputError = (popupForm, popupInput, config) => {
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(config.inputErrorClass);
    popupError.classList.remove(config.errorClass);
    popupError.textContent = "";
    
};

const isValid = (popupForm, popupInput, config) => {
    if (!popupInput.validity.valid) {
        showInputError(popupForm, popupInput, config, popupInput.validationMessage);
    } else {
        hideInputError(popupForm, popupInput, config);
    }
};

const toggleButtonState = (inputList, popupSubmit, config) => {
    if(hasInvalidInput(inputList)) {
        popupSubmit.classList.add(config.inactiveButtonClass);
        popupSubmit.disabled = 'disabled';
    } else {
        popupSubmit.classList.remove(config.inactiveButtonClass);
        popupSubmit.disabled = '';  
    }
}; 

const hasInvalidInput = (inputList) => {
    return inputList.some((popupInput) => {
        return !popupInput.validity.valid;
    });
}; 

const setEventListeners = (popupForm, config) => {
    const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
    const popupSubmit = popupForm.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, popupSubmit, config);

    inputList.forEach((popupInput) => {
         popupInput.addEventListener('input', () => {
         isValid(popupForm, popupInput, config);

         toggleButtonState(inputList, popupSubmit, config);
     });
  });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((popupForm) => {
        setEventListeners(popupForm, config);
    });
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__submit-profile-info',
    inactiveButtonClass: 'popup__submit-profile-info_disabled',
    inputErrorClass: 'popup__edit_type_error',
    errorClass: 'popup__edit-error_type_active'
  });