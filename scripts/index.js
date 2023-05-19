const content = document.querySelector('.content');

//попап редактирования профиля
const profileName = content.querySelector('.profile__name');
const profileSign = content.querySelector('.profile__sign');
const buttonEditProfile = content.querySelector('.profile__edit-btn');
const buttonCloseEditProfilePopup = document.querySelector('.popup__close_profile');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const formEditProfile = document.querySelector('.popup__form_profile');
const inputName = document.querySelector('.popup__item_type_name');
const inputSign = document.querySelector('.popup__item_type_sign');

//попап открытия фотографии
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupImageCard = document.querySelector('.popup__image-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const buttonClosePhoto = document.querySelector(".popup__close_photo");
const buttonCloseAddCardPopup = document.querySelector('.popup__close_card');

//попап добавления карточки
const formAddCard = document.querySelector(".popup__form_card");
const buttonOpenFormNewCard = document.querySelector(".profile__add-photo-btn");
const popupButtonOpenFormNewCard = document.querySelector(".popup_type_add-card");
const popupEditForm = document.querySelector(".popup__form");
const popupInputPlaceTitle = document.querySelector(".popup__item_palce_name");
const popupInputPlaceLink = document.querySelector(".popup__item_place_link");
const cardTemplate = document.querySelector("#elements-add").content.querySelector(".elements__item");
const cardsContainer = document.querySelector(".elements__list");

/*
 * Профиль
 */
function openEditForm() {
  inputName.value = profileName.textContent;
  inputSign.value = profileSign.textContent;

  openPopup(popupEditProfile);
}

function closeEditForm() {
  closePopup(popupEditProfile);
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSign.textContent = inputSign.value;

  closeEditForm();
}

/*
 * Карточки
 */

//лайк карточке
const handleToggleLike = (event) => {
  event.target.classList.toggle("elements__like_active");
};

//закрыть полный размер карточки
function closeCard() {
  closePopup(popupCardPhoto);
};

//добавление новой карточки
function openFormAddNewCard() {
  openPopup(popupButtonOpenFormNewCard);
};

function closeFormAddNewCard() {
  closePopup(popupButtonOpenFormNewCard);
};

/*
 * Попап
 */

//закрытие попапа кнопкой Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//закрытие попапа кликом мыши вне элемента
function setClosePopupByOverlayEventListener(el) {
  el.addEventListener("mousedown", handleClosePopupByOverlay);
}

function handleClosePopupByOverlay(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}

function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  setClosePopupByOverlayEventListener(el);
}

function closePopup(el) {
  document.removeEventListener("keydown", closeByEsc);
  el.removeEventListener("mousedown", handleClosePopupByOverlay);
  el.classList.remove("popup_opened");
}

//функция деактивирования кнопки
function addButtonInactive(form) {
  const popupButtonSave = form.querySelector(".popup__submit");
  popupButtonSave.classList.add("popup__submit_inactive");
  popupButtonSave.disabled = true;
}

//первоначальное наполнение карточками
const generateCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  const placeNewElements = card.querySelector(".elements__place");
  const elementLike = card.querySelector(".elements__like");
  const elementDeleteCard = card.querySelector(".elements__delete");
  const cardImage = card.querySelector(".elements__image");
  const placeElements = card.querySelector(".elements__place");

  cardImage.src = cardData.link;
  placeNewElements.textContent = cardData.name;
  cardImage.alt = placeElements.textContent;
  cardImage.textContent = placeElements.textContent;

  //открытие фотографии
  function handleElementsCard() {
    popupImageCard.src = cardImage.src;
    popupImageCard.alt = placeElements.textContent;
    popupTitleCard.textContent = placeElements.textContent;
    openPopup(popupCardPhoto);
  }

  //открытие карточки в полный размер
  cardImage.addEventListener("click", handleElementsCard);

  //нажатие по корзине
  elementDeleteCard.addEventListener("click", handleDeleteCard);

  //лайк
  elementLike.addEventListener("click", handleToggleLike);
  return card;
};

const handleDeleteCard = (event) => {
  event.target.closest(".elements__item").remove();
};

const addCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
};

//подтверждение добавления карточки
const handleCardFormSubmit = (event) => {
  event.preventDefault();
  addCard({
    name: popupInputPlaceTitle.value,
    link: popupInputPlaceLink.value,
  });
  event.target.reset();
  closePopup(popupButtonOpenFormNewCard);
  addButtonInactive(formAddCard);
};

initialCards.forEach((cardData) => {
  addCard(cardData);
});

//лиснеры кнопки профиля
buttonEditProfile.addEventListener('click', openEditForm);
buttonCloseEditProfilePopup.addEventListener('click', closeEditForm);
formEditProfile.addEventListener('submit', saveProfile);

//лиснеры попап создания новой карточки
buttonOpenFormNewCard.addEventListener('click', openFormAddNewCard);
buttonCloseAddCardPopup.addEventListener('click', closeFormAddNewCard);

//добавить новую карточку
formAddCard.addEventListener('submit', handleCardFormSubmit);

//закрытие полноразмерного фото карточки
buttonClosePhoto.addEventListener('click', closeCard);