export class Card {

  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._templateSelector.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__image");
    this._buttonLike = this._element.querySelector(".elements__like");
    this._buttonDelete = this._element.querySelector(".elements__delete");

    this._popupCardPhoto = document.querySelector('.popup_photo_card');
    this._popupImageCard = document.querySelector('.popup__image-card');
    this._popupTitleCard = document.querySelector('.popup__title-card');

    this._setEventListeners();

    this._image.setAttribute("src", `${this._link}`);
    this._image.setAttribute("alt", `${this._name}`);
    this._element.querySelector(".elements__place").textContent = `${this._name}`;
    return this._element;
  }

  //сеттим листнеры для элементов карточки
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    this._buttonDelete.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("elements__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}