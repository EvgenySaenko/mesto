export class FormValidator {
  constructor(value, formElement) {
    this._value = value;
    this._formSelector = value.formSelector;
    this._inputSelector = value.inputSelector;
    this._submitButtonSelector = value.submitButtonSelector;
    this._inactiveButtonClass = value.inactiveButtonClass;
    this._inputErrorClass = value.inputErrorClass;
    this._errorClass = value.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._addClassEl(inputElement, this._inputErrorClass);
    errorElement.textContent = errorMessage;
    this._addClassEl(errorElement, this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._removeClassEl(inputElement, this._inputErrorClass);
    this._removeClassEl(errorElement, this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => { evt.preventDefault(); });
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => { return !inputElement.validity.valid; });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList, this._buttonElement)) {
      this._addClassEl(this._buttonElement, this._inactiveButtonClass);
    } else {
      this._removeClassEl(this._buttonElement, this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _removeClassEl(el, classEl) {
    el.classList.remove(classEl);
  }
  _addClassEl(el, classEl) {
    el.classList.add(classEl);
  }

  //очистка ошибки при выходе из попапа
  clearInput(elPopup) {
    const errorInputLine = Array.from(
      elPopup.getElementsByClassName(this._inputErrorClass)
    );

    errorInputLine.forEach((el) => {
      el.form.reset();
      el.classList.remove(this._inputErrorClass);
    });

    const errorInputSubline = Array.from(
      elPopup.getElementsByClassName(this._errorClass)
    );
    errorInputSubline.forEach((el) => (el.textContent = ""));
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  enableSubmitButton() {
    this._removeClassEl(this._buttonElement, this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  resetSubmit() {
    this._inputList.forEach((inputElement) => {
      if (!(inputElement === null || inputElement.length < 2)) {
        this.enableSubmitButton();
      }
    });
  }
}
