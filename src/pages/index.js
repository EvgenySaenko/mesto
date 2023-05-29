import './index.css';
import {
  initialCards, validationConfig,
  cardTemplateItem, cardsContainer, buttonEditProfile,
  buttonOpenFormNewCard
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
const popupUserInfo = new PopupWithForm(".popup_edit_profile", {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

  },
});
popupUserInfo.setEventListeners();

//открытиe редактирования профиля
// const formEditProfile = document.querySelector('.popup__form_profile');

buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  formValidators["form-profile"].resetValidation();
  popupUserInfo.open();
  // addButtonInactive(formEditProfile);
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
const popupAddNewCard = new PopupWithForm(".popup_type_add-card", {
  handleFormSubmit: ({ place, link }) => {
    cardsList.setItem(createCard({ name: place, link: link }));
  },
});
popupAddNewCard.setEventListeners();

//функция деактивирования кнопки
// const formAddCard = document.querySelector(".popup__form_card");

// function addButtonInactive(form) {
//   const popupButtonSave = form.querySelector(".popup__submit");
//   popupButtonSave.classList.add("popup__submit_inactive");
//   popupButtonSave.disabled = true;
// }

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(".popup_photo_card");
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["form-card"].resetValidation();
  popupAddNewCard.open();
  // addButtonInactive(formAddCard);
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