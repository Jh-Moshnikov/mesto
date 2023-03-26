export default class UserInfo {
    constructor({profileNameSelector, profileOccupationSelector, profileAvatarSelector}) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileOccupation = document.querySelector(profileOccupationSelector);
      this._profileAvatar = document.querySelector(profileAvatarSelector);
    }
  
    getUserInfo() {
      const userInfo = {
        profileName: this._profileName.textContent,
        profileOccupation: this._profileOccupation.textContent,
        profileAvatar: this._profileAvatar.src,
      }
      return userInfo;
      
    }
   
    setUserInfo(data) {
     if (data.name) this._profileName.textContent = data.name; 
     if (data.about) this._profileOccupation.textContent = data.about;
     this.setAvatar(data);

    }
  
    setAvatar(data) {
      if (data.avatar) this._profileAvatar.src = data.avatar;
      if (data.name) this._profileAvatar.alt = data.name;
    }


  }
