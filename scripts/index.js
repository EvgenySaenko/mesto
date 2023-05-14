const content = document.querySelector('.content');

//попап редактирования профиля
const profileName = content.querySelector('.profile__name');
const profileSign = content.querySelector('.profile__sign');
const profileEditBtn = content.querySelector('.profile__edit-btn');
const buttonCloseEditProfilePopup = document.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup');
const formEditProfile = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__item_type_name');
const inputSign = document.querySelector('.popup__item_type_sign');

//попап открытия фотографии
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupImageCard = document.querySelector('.popup__image-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const buttonClosePhoto = document.querySelector(".popup__close_photo");
const buttonCloseAddCardPopup = document.querySelector('.popup__close_card');

//попап добавления карточки
const formAddCard = document.querySelector(".popup__formcard");
const buttonOpenFormNewCard = document.querySelector(".profile__add-photo-btn");
const popupButtonOpenFormNewCard = document.querySelector(".popup_type_add-card");
const userNameInput = document.querySelector(".popup__item_type_name");
const jobInput = document.querySelector(".popup__item_type_sign");
const popupEditForm = document.querySelector(".popup__form");
const popupInputPlaceTitle = document.querySelector(".popup__item_palce_name");
const popupInputPlaceLink = document.querySelector(".popup__item_place_link");

const elementsTemplate = document.querySelector("#elements-add").content.querySelector(".elements__item");
const elementsList = document.querySelector(".elements__list");

//функции редактирования профиля
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

/*функции карточек*/
// лайк карточке
const likeLike = (event) => {
  event.target.classList.toggle("elements__like_active");
};

//раскрыть в полный размер
function openPopup(elem) {
  elem.classList.add("popup_opened");
};

//общая функция закрытия попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

//первоначальное наполнение карточками
const generateElementList = (cardData) => {
  const templateElements = elementsTemplate.cloneNode(true);
  const placeNewElements = templateElements.querySelector(".elements__place");
  const elementLike = templateElements.querySelector(".elements__like");
  const elementDeleteCard = templateElements.querySelector(".elements__delete");
  const cardImage = templateElements.querySelector(".elements__image");
  const placeElements = templateElements.querySelector(".elements__place");

  cardImage.src = cardData.link;
  placeNewElements.textContent = cardData.name;

  //функция открытия фотографии
  function handleElementsCard() {
    popupImageCard.src = cardImage.src;
    popupImageCard.alt = placeElements.textContent;
    popupTitleCard.textContent = placeElements.textContent;
    openPopup(popupCardPhoto);
  }

  //листнеры карточек
  cardImage.addEventListener("click", handleElementsCard);

  //функция удаления фотографии
  elementDeleteCard.addEventListener("click", handleDeleteCard);

  //функция лайка фотографии
  elementLike.addEventListener("click", likeLike);
  return templateElements;
};

const handleDeleteCard = (event) => {
  event.target.closest(".elements__item").remove();
};

const addCard = (cardData) => {
  elementsList.prepend(generateElementList(cardData));
};

//подтверждение добавления карточки
const submitAddNewCard = (event) => {
  event.preventDefault();
  // console.log(popupInputPlaceTitle);
  // console.log(popupInputPlaceLink);
  addCard({
    name: popupInputPlaceTitle.value,
    link: popupInputPlaceLink.value,
  });
  event.target.reset();
  closePopup(popupButtonOpenFormNewCard);
};

initialCards.forEach((cardData) => {
  addCard(cardData);
});

//листнеры кнопки профиля
profileEditBtn.addEventListener('click', openEditForm);
buttonCloseEditProfilePopup.addEventListener('click', closeEditForm);
formEditProfile.addEventListener('submit', saveProfile);

//листнеры попап создания новой карточки
buttonOpenFormNewCard.addEventListener('click', openFormAddNewCard);
buttonCloseAddCardPopup.addEventListener('click', closeFormAddNewCard);

//добавить новую карточку
formAddCard.addEventListener('submit', submitAddNewCard);

//закрытие полноразмерного фото карточки
buttonClosePhoto.addEventListener('click', closeCard);
