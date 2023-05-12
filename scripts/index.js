let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSign = content.querySelector('.profile__sign');
let profileEditBtn = content.querySelector('.profile__edit-btn');

let editButton = document.querySelector('.popup__edit-btn');
let closeButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__item_type_name');
let inputSign = document.querySelector('.popup__item_type_sign');

function openEditForm() {
    inputName.value = profileName.textContent;
    inputSign.value = profileSign.textContent;
    popup.classList.add('popup_opened');
}

function closeEditForm() {
    popup.classList.remove('popup_opened');
}

function saveProfile (evt) {
    
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileSign.textContent = inputSign.value;

    closeEditForm();
}


profileEditBtn.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', saveProfile);
