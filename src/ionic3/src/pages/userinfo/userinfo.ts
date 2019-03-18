import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserInfo} from "../login/loginEntity";
import {LoginPage} from "../login/login";

@Component({
  selector: 'userinfo-page',
  templateUrl: 'userinfo.html'
})
export class UserInfoPage implements OnInit {
  userInfo: UserInfo = new UserInfo();

  ngOnInit(): void {
    this.storage.get('userInfo').then(result => {
      this.userInfo = result as UserInfo;
      this.userInfo = this.userInfo ? this.userInfo : new UserInfo();
    });
  }

  constructor(public navCtrl: NavController,
              public storage: Storage) {
  }

  logOut() {
    let navCtrl = this.navCtrl;
    this.storage.remove('userInfo').then(function () {
      navCtrl.setRoot(LoginPage);
    });
  }
}
