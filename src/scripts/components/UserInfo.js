
class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    };

    setUserInfo(item) {
        this._name.textContent = item.name;
        this._about.textContent = item.about;
        this._userId = item.id;
        this._avatar.src = item.avatar
    };

    setUserAvatar(imagLink) {
        this._avatar.src = imagLink;
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            id: this._userId,
            avatar: this._avatar,
        };
    };
}

export { UserInfo };
