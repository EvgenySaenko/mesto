export class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
      this._authorization = config.headers["authorization"];
    }
    
    // получить данные с сервера
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      })
      .then((res) => this._checkResponse(res));
    }
  
    //получить данные пользователя с сервера
    getUserInfoApi() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    }
  
    //передать данные пользователя на сервер
    setUserInfoApi(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          about: data.description,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //добавление новой карточки на сервер
    addNewCards(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //передача лайка на сервер
    sendLike(dataId) {
      return fetch(`${this._url}/cards/${dataId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    }
  
    //удаление лайка на сервере
    deleteLike(dataId) {
      return fetch(`${this._url}/cards/${dataId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    }
  
    //удаление карточки с сервера
    deleteCardApi(dataId) {//todo заменить на cardId
      return fetch(`${this._url}/cards/${dataId}`, {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    }
  
    //------- смена автарки ------------
    setUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    //---------проверка /вывод ошибки----------
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка : ${res.status}`
      );
    }
  }
  