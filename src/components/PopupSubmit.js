import { Popup } from "./Popup.js";

export class PopupSubmit extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._buttonSubmit = this._popup.querySelector(".popup__button-save");
  }

  //открытие попапа и получение данных о карточке
  open(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  //предзагрузка (Удаление .../ Сохранение...)
  renderPreloader(isLoading, displayText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    } else {
      this._buttonSubmit.textContent = this.defaulText;
    }
  }

  //сетим листнеры
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", () => this._handleSubmit(this.id, this.card));
  }
}

