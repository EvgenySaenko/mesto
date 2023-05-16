
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  config
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  addClassElem(inputElement, config.inputErrorClass);
  errorElement.textContent = errorMessage;
  addClassElem(errorElement, config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  removeClassElem(inputElement, config.inputErrorClass);
  removeClassElem(errorElement, config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    config.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formList.forEach((formElement) => {
    // formElement.addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    // });
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    addClassElem(buttonElement, config.inactiveButtonClass);
  } else {
    removeClassElem(buttonElement, config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function removeClassElem(el, classEl) {
  el.classList.remove(classEl);
}
function addClassElem(el, classEl) {
  el.classList.add(classEl);
}