
class UserInfo {
    constructor({ name, about }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    };

    setUserInfo(item) {
        this._name.textContent = item.name;
        this._about.textContent = item.about;
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    };
}

export { UserInfo };
