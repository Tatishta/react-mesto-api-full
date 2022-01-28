class Api {
  constructor(url, headerOptions) {
    this._url = url;
    this._headerOptions = headerOptions;
  }

  _getResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headerOptions
    })
    .then(this._getResult);
  }

  getMyInfo() {
    return fetch(this._url + '/users/me', {
    headers: this._headerOptions
    })
    .then(this._getResult);
  }

  editUserInfo(name, about) {
    return fetch(this._url + '/users/me', {
    method: 'PATCH',
    headers: this._headerOptions,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(this._getResult);
  }

  getNewAvatar(avatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headerOptions,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._getResult);
  }

  addCard(name, link) {
    return fetch(this._url + '/cards', {
    method: 'POST',
    headers: this._headerOptions,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(this._getResult);
  }

  deleteCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headerOptions,
      body: JSON.stringify({
        id: cardId
      })
    })
    .then(this._getResult);
  }

  stateLike(cardId, isLiked) {
    if (!isLiked) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headerOptions,
      body: JSON.stringify({
        id: cardId
      })
    })
    .then(this._getResult);
  } else {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headerOptions,
      body: JSON.stringify({
        id: cardId
      })
    })
    .then(this._getResult);
  }}
}

export const newApi = new Api('https://mesto.nomoreparties.co/v1/cohort-28', {
  authorization: '4e5510c0-c313-4452-9bc3-e4f594fb4897',
  'Content-Type': 'application/json'
});
