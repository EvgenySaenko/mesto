export class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._profileAvatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserAvatar(user) {
    this._profileAvatar.src = user.avatar;
  }
}