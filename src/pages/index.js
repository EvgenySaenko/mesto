import './index.css';
import { apiConfig } from '../utils/constants.js';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards, 
  validationConfig,
  cardTemplateItem,
  cardsContainer,
  buttonEditProfile,
  buttonOpenFormNewCard,
  buttonAvatar
} from "../utils/constants.js";

/**
 * Профиль
 **/

let currentUserId;
const api = new Api(apiConfig);
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, data]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({ name: user.name, description: user.description });
    userInfo.setUserAvatar(user);
    cardsList.rendererItems(data, currentUserId);
  })
  .catch((error) => console.log(error));

//данные профиля
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__sign",
  avatar: ".profile__avatar"
});

/**
 * Карточка
 **/

//создание карточки
const createCard = (data, user) => {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: cardTemplateItem,
    handleCardClick: () => {
      popupImage.open(data);
    },

    handleDeleteCard: (cardID, cardElement) => {
      popupFormDelete.open(cardID, cardElement);
    },

    setLikeQty: (cardID) => {
      api
        .sendLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((error) => console.log(error));
    },
    setDislikeQty: (cardID) => {
      api
        .deleteLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((error) => console.log(error));
    },
  });

  return card.generateCard();
};

//наполнение карточками
const cardsList = new Section(
  {
    renderer: (initialCards, userId) => {
      cardsList.addItem(createCard(initialCards, userId));
    },
  },
  cardsContainer
);

//удаление карточки 
const popupFormDelete = new PopupSubmit(".popup_delete", {
  handleSubmit: (id, card) => {//todo заменить на cardId
    popupFormDelete.renderPreloader(true, "Удаление ...");
    api
      .deleteCardApi(id)//todo заменить на cardId
      .then(() => {
        card.deleteCard();
        popupFormDelete.close();
      })
      .catch((error) => console.log("error delete card :" + error))
      .finally(() => {
        popupFormDelete.renderPreloader(false);
      });
  },
});

//попап профиля
const popupUserInfo = new PopupWithForm(".popup_edit_profile", {
  handlFormSubmit: (data) => {
    return api
      .setUserInfoApi(data)    
      .then(() => userInfo.setUserInfo(data)) 
      .catch((error) => console.log(error))
      .finally(() => popupAddNewCard.renderPreloader(false));
  },
});

//открытиe редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  formValidators["form-profile"].resetValidation();
  popupUserInfo.open();
  // addButtonInactive(formEditProfile);
});

//попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(".popup_type_add-card", {
  handlFormSubmit: ({ place, link }) => {
    return api
      .addNewCards({ name: place, link: link })
      .then((newCard) => {
        cardsList.addItemPrepend(createCard(newCard, currentUserId));
      })
      .catch((error) => console.log("add card :", error))
      .finally(() => popupAddNewCard.renderPreloader(false));
  },
});

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(".popup_photo_card");
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["form-card"].resetValidation();
  popupAddNewCard.open();
});

//попап редактировапния аватара
const newAvatar = new PopupWithForm(".popup_avatar", {
  handlFormSubmit: (data) => {
    return api
      .setUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((error) => console.log(error));
  },
});

buttonAvatar.addEventListener("click", () => {
  formValidators["form-avatar"].resetValidation();
  newAvatar.open();
});


//цепляем листнеры
popupImage.setEventListeners();
popupUserInfo.setEventListeners();
popupAddNewCard.setEventListeners();
popupFormDelete.setEventListeners();
newAvatar.setEventListeners();

const formValidators = {}

// включение валидации
const enableValidation = (validationConfig) => {
  //const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
formValidators['form-profile'].resetValidation();
formValidators['form-card'].resetValidation();
formValidators["form-avatar"].resetValidation();










// //попап профиля
// const popupUserInfo = new PopupWithForm(".popup_edit_profile", {
//   handleFormSubmit: (data) => {
//     userInfo.setUserInfo(data);

//   },
// });
// popupUserInfo.setEventListeners();

// // const formEditProfile = document.querySelector('.popup__form_profile');

// buttonEditProfile.addEventListener("click", () => {
//   popupUserInfo.setInputValues(userInfo.getUserInfo());
//   formValidators["form-profile"].resetValidation();
//   popupUserInfo.open();
//   // addButtonInactive(formEditProfile);
// });




// //попап добавления новой карточки
// const popupAddNewCard = new PopupWithForm(".popup_type_add-card", {
//   handleFormSubmit: ({ place, link }) => {
//     cardsList.addItem(createCard({ name: place, link: link }));
//   },
// });
// popupAddNewCard.setEventListeners();

// //функция деактивирования кнопки
// // const formAddCard = document.querySelector(".popup__form_card");

// // function addButtonInactive(form) {
// //   const popupButtonSave = form.querySelector(".popup__submit");
// //   popupButtonSave.classList.add("popup__submit_inactive");
// //   popupButtonSave.disabled = true;
// // }

// /**
//  * Полноразмерное фото карточки
//  **/

// //попап полноразмерного фото карточки
// const popupImage = new PopupWithImage(".popup_photo_card");
// popupImage.setEventListeners();

// buttonOpenFormNewCard.addEventListener("click", () => {
//   formValidators["form-card"].resetValidation();
//   popupAddNewCard.open();
//   // addButtonInactive(formAddCard);
// });

// /**
//  * Валидация
//  **/

// const formValidators = {}

// // включение валидации
// const enableValidation = (validationConfig) => {
//   //const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
//   const formList = Array.from(document.forms);
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(validationConfig, formElement);
//     const formName = formElement.getAttribute('name');
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(validationConfig);
// formValidators['form-profile'].resetValidation();
// formValidators['form-card'].resetValidation();
// formValidators["form-avatar"].resetValidation();