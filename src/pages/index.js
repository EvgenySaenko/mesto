import './index.css';
import {
  initialCards, validationConfig,
  cardTemplateItem, popupCardPhoto, cardsContainer, popupEditProfile, buttonEditProfile,
  popupFormNewCard, buttonOpenFormNewCard
}
  from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

/**
 * Профиль
 **/

//данные профиля
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__sign",
});

//попап профиля
const popupUserInfo = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

  },
});
popupUserInfo.setEventListeners();

//открытиe редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  popupUserInfo.open();
  formValidators["form-profile"].resetValidation();
});

/**
 * Карточка
 **/

//создание карточки
const createCard = (data) => {
  const card = new Card(data, cardTemplateItem, () => {
    popupImage.open(data);
  });
  return card.generateCard();
};

//наполнение карточками
const cardsList = new Section(
  {
    renderer: (initialCards) => {
      cardsList.setItem(createCard(initialCards));
    },
  },
  cardsContainer
);
cardsList.rendererItems(initialCards);

//попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupFormNewCard, {
  handleFormSubmit: ({ place, link }) => {
    cardsList.setItem(createCard({ name: place, link: link }));
  },
});
popupAddNewCard.setEventListeners();

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(popupCardPhoto);
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["form-card"].resetValidation();
  popupAddNewCard.open();
});

/**
 * Валидация
 **/

const formValidators = {}

// включение валидации
const enableValidation = (validationConfig) => {
  //const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  const formList = Array.from(document.forms)
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
formValidators['form-profile'].resetValidation()
formValidators['form-card'].resetValidation()