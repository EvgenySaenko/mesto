export class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    like,
    unlike,
    handleDeleteCard
  }) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._likeQty = data.likes.length;
    this.cardId = data._id;
    this.like = like;
    this.unlike = unlike;
    this._handleDeleteCard = handleDeleteCard;
    this._userIdOwner = data.owner._id;
    this.userId = userId;
    this._counter = 0;
  }

  _getTemplate() {
    return this._templateSelector.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._place = this._element.querySelector(".elements__place");
    this._image = this._element.querySelector(".elements__image");
    this._buttonLike = this._element.querySelector(".elements__like");
    this._buttonDelete = this._element.querySelector(".elements__delete");
    this._image.setAttribute("src", `${this._link}`);
    this._image.setAttribute("alt", `${this._name}`);
    this._place.textContent = this._name;
    this._elementCardLikeQty = this._element.querySelector("div.elements__bottom span.elements__likes-quantity");
    this.renderLikes(this._data);

    // устанавливаю лайки карточкам:
    this._elementCardLikeQty.innerText = this._likeQty;

    // проверить моя ли карточка - нет -> удалить корзину
    if (this.userId !== this._userIdOwner) {
      this._buttonDelete.remove();
    }
    this._setEventListeners();
    return this._element;
  }

  //сеттим листнеры для элементов карточки
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    this._buttonDelete.addEventListener("click", () => this._handleDeleteCard(this, this.cardId));
    this._image.addEventListener("click", () => this._handleCardClick({ name: this._name, link: this._link }));
  }

  renderLikes(cardID) {
    this._likesQTY = cardID.likes.length;
    this._likes = cardID.likes;

    if (this._likesQTY === 0) {
      this._elementCardLikeQty.textContent = "0";
    } else {
      this._elementCardLikeQty.textContent = this._likesQTY;
    }

    if (this.isMylikeCard()) {
      this._buttonLike.classList.add("elements__like_active");
    } else {
      this._buttonLike.classList.remove("elements__like_active");
    }
  }

  _toggleLike() {
    return this.isMylikeCard() ? this.unlike(this.cardId) : this.like(this.cardId);
  }

  //мои ли лайки на карточке
  isMylikeCard() {
    return this._likes.some((elem) => elem._id === this.userId);
  }

  //удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}