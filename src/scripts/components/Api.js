class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };

    _checkResponseStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfoFromServer() {
        return fetch(`${this._baseUrl}/users/me`,{
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    getCardsFromServer() {
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

    deleteCardFromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    };

    addCardToServer({ name, link }) {
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            }),
        }).then(res => this._checkResponseStatus(res));
    };

    patchUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(res => this._checkResponseStatus(res));
    };

    patchUserAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar}),
        }).then(res => this._checkResponseStatus(res));
    };

}

export { Api }