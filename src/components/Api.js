export default class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
        .then(this._getResponse); //async, который использую в script.js, является надстройкой над промисами, то  можем смешивать код
       
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
        .then(this._getResponse);
    }

    setUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about
            }),
        }).then(this._getResponse)
    }

   

    addNewCard(data)  {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._getResponse);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._getResponse);
    }

    like(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._getResponse);
    }

    deletelike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponse);
    }

}