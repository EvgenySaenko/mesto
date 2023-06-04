export class Api {
    constructor(baseUrl, headers) {
      this._url = baseUrl;
      this._headers = headers;
    }
    
    //получить список карточек
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
      methos: "GET", 
      headers: this._headers})
      .then((res) => this._checkResponse(res));
    }
  
    //получить данные пользователя
    getUserInfoApi() {
      return fetch(`${this._url}/users/me`,{
      methos: "GET",
      headers: this._headers})
      .then((res) => this._checkResponse(res));
    }
  
    //изменить данные пользователя
    setUserInfoApi(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.description,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //добавить новую карточку
    addNewCards(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //добавить лайк
    sendLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    //убрать лайк
    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    //удалить конкретную карточку
    deleteCardApi(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    //изменить аватар
    setUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //проверка ответа, вывод ошибки и  ее статус кода
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка : ${res.status}`
      );
    }
  }
  