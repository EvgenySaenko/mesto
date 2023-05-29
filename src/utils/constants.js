const content = document.querySelector('.content');
//попап редактирования профиля
const profileName = content.querySelector('.profile__name');
const profileSign = content.querySelector('.profile__sign');
const buttonOpenFormNewCard = document.querySelector(".profile__add-photo-btn");
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
const popupFormNewCard = document.querySelector(".popup_type_add-card");
const popupInputPlaceTitle = document.querySelector(".popup__item_palce_name");
const popupInputPlaceLink = document.querySelector(".popup__item_place_link");
const cardTemplate = document.querySelector("#elements-add");
const cardTemplateItem = document.querySelector("#elements-add").content.querySelector(".elements__item");
const cardsContainer = document.querySelector(".elements__list");

export {
  cardTemplateItem, popupCardPhoto, cardsContainer,
  popupEditProfile, buttonEditProfile, popupFormNewCard, buttonOpenFormNewCard
}

export const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const initialCards = [
  {
    name: 'Бразилия',
    link: 'https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'
  },
  {
    name: 'Индия',
    link: 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Египет',
    link: 'https://images.unsplash.com/photo-1568503446072-5c1c17d9b018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Италия',
    link: 'https://img3.akspic.ru/previews/9/1/3/6/4/146319/146319-drevnij_rim-arhitektura-amfiteatr-arka-nacionalnyj_istoricheskij_pamyatnik-x750.jpg'
  },
  {
    name: 'Китай',
    link: 'https://img3.akspic.ru/crops/2/3/2/4/0/104232/104232-istoricheskoe_mesto-razvaliny-fortifikaciya-drevnyaya_istoriya-nebo-1920x1080.jpg'
  },
  {
    name: 'Россия',
    link: 'https://images.unsplash.com/photo-1594397394907-096148b9d1c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNhaW50JTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
];