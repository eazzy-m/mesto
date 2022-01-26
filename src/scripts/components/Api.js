class Api {
    constructor(options) {
        this._options = options;
    };

    _checkResponseStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._options.baseUrl}/users/me`,{
            headers: this._options.headers,
        }).then(res => this._checkResponseStatus(res));
    };

    getCardList() {
        return fetch(`${this._options.baseUrl}/cards`,{
            headers: this._options.headers,
        }).then(res => this._checkResponseStatus(res));
    };

    changeLikeCard(cardId, like) {
        return fetch(`${this._options.baseUrl}/cards/like/${cardId}`,{
            method: like ? 'DELETE' : 'PUT',
            headers: this._options.headers,
        }).then(res => this._checkResponseStatus(res));
    };

    removeCard(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._options.headers,
        }).then(res => this._checkResponseStatus(res));
    };

    addCard({ name, link }) {
        return fetch(`${this._options.baseUrl}/cards`,{
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(res => this._checkResponseStatus(res));
    };

    setUserInfo({ name, about }) {
        return fetch(`${this._options.baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(res => this._checkResponseStatus(res));
    };

    setUserAvatar({ avatar }) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({avatar}),
        }).then(res => this._checkResponseStatus(res));
    };

}

export { Api }