
class UserInfo {
    constructor({ userName, userOccupation }) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
    };

    setUserInfo(item) {
        this._userName.textContent = item.userName;
        this._userOccupation.textContent = item.userOccupation;
    };

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userOccupation: this._userOccupation.textContent
        };
    };
}

export { UserInfo };
