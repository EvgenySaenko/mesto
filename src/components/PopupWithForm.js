import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("div.popup__container .popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__item"));
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;//возвращаем введённые данные обоих полей при редактировании профиля
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if(!(typeof data[input.name] === "undefined")){
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}