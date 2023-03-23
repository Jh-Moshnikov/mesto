export default class UserInfo {
    constructor({profileNameSelector, profileOccupationSelector}) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileOccupation = document.querySelector(profileOccupationSelector);
    }
  
    getUserInfo() {
      const userInfo = {
        profileName: this._profileName.textContent,
        profileOccupation: this._profileOccupation.textContent,
      }
      return userInfo;
      
    }
   
    setUserInfo(data) {
      this._profileName.textContent = data[0]; // соответственно вставляю как элементы массива
      this._profileOccupation.textContent = data[1];
    }
  
  }