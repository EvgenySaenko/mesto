import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("div.popup__container .popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__item"));
    this._buttonSubmit = this._popup.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;//возвращаем введённые данные обоих полей при редактировании профиля
  }

  //заполнение полей формы
  setInputValues(data) {
    this._inputList.forEach((input) => {
      if(!(typeof data[input.name] === "undefined")){
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", () => {
      const initialText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = "Сохранение ...";
      console.log(this)
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._buttonSubmit.textContent = initialText;
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  //предзагрузка (Удаление .../ Сохранение...)
  renderPreloader(isLoading, displayText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    }
  }
}