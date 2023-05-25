export class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}