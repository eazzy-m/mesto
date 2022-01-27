class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };

    _checkResponseStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,{
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    getDefaultCards() {
        return fetch(`${this._baseUrl}/cards`,{
            method: 'GET',
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    changeLikeCard(cardId, like) {
        return fetch(`${this._baseUrl}/cards/like/${cardId}`,{
            method: like ? 'DELETE' : 'PUT',
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    addCard(item) {
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item),
        }).then(res => this._checkResponseStatus(res));
    };

    setUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(res => this._checkResponseStatus(res));
    };

    setUserAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar}),
        }).then(res => this._checkResponseStatus(res));
    };

}

export { Api }