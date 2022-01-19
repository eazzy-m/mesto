
class UserInfo {
    constructor({ userName, userOccupation }) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
    };

    setUserInfo(item) {
        this._userName.textContent = item.profile_info_title;
        this._userOccupation.textContent = item.profile_info_subtitle;
    };

    getUserInfo() {
        const userInfo = {};
        userInfo.profile_info_title = this._userName.textContent;
        userInfo.profile_info_subtitle = this._userOccupation.textContent;
        return userInfo;
    };
}

export { UserInfo };
