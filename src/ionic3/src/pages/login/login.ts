import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {LoadingController, ToastController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {GlobalConfig} from '../../app/golbal.config';
import {LoginStatus, UserInfo} from './loginEntity';
import {HomePage} from "../homepage/home";
import {Resource} from "../homepage/homeEntity";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
  ngOnInit(): void {
    this.storage.get('userInfo').then(result => {
      if (result != null && (result as UserInfo).id != null) {
        GlobalConfig.USERINFO = (result as UserInfo);
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  private loginUrl = '/xinhai/login';
  private userInfoUrl = '/transfer/initUserInfo';
  private menuUrl = '/basic/resources/resource/app/';

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private storage: Storage,
              private http: HttpClient,
              private loadingCtrl: LoadingController) {
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value === '') {
      let alert = this.toastCtrl.create({
        message: '请输入用户名',
        duration: 2000,
        position: 'top',
        cssClass: 'alert-info'
      });
      alert.present();

      return;
    }

    if (password.value === '') {
      let alert = this.toastCtrl.create({
        message: '请输入密码',
        duration: 1000,
        position: 'top',
        cssClass: 'alert-info'
      });
      alert.present();

      return;
    }

    let nav = this.navCtrl;
    let alertCtrl = this.alertCtrl;
    let loading = this.loadingCtrl.create({
      content: '正在登录...'
    });

    this.LoginWithOutSecurity(nav);

    this.http.get(GlobalConfig.ApiURL + this.loginUrl + '/' + username.value + '/' + password.value)
      .toPromise()
      .then(result => {
        loading.dismiss();
        if ((result as LoginStatus).failed) {
          alertCtrl.create({
            title: '用户名或密码错误！',
            buttons: ['确定']
          }).present();
        } else {
          this.login(username, nav, alertCtrl);
        }
      })
      .catch(err => {
        loading.dismiss();
        GlobalConfig.handleError(err).catch(function (result) {
          alertCtrl.create({
            title: '登录失败，请检查网络连接！',
            buttons: ['确定']
          }).present();
        })
      });
  }

  private LoginWithOutSecurity(nav) {
    // GlobalConfig.USERINFO = new UserInfo();
    let menu = [{
      menuIcon: 'calendar',
      name: '数据监测',
      url: 'DataMonitoringPage'
    }, {
      menuIcon: 'clipboard',
      name: '报警统计',
      url: 'AlarmPage'
    }, {
      menuIcon: 'lock',
      name: '设备管理',
      url: 'DevicePage'
    }];
    // nav.setRoot(HomePage);
    return menu;
  }

  private login(username: HTMLInputElement, nav, alertCtrl) {
    let ev = this;
    this.http.get(GlobalConfig.ApiURL + this.userInfoUrl + '/' + username.value)
      .toPromise()
      .then(result => {
        let userInfo = result as UserInfo;
        // ev.getMenu(userInfo.userAccount).then(menu => {
        //   userInfo.menu = menu;
        //   this.storage.set("userInfo", userInfo)
        //     .then(function () {
        //       GlobalConfig.USERINFO = (result as UserInfo);
        //       nav.setRoot(HomePage);
        //     })
        //     .catch(err => {
        //       GlobalConfig.handleError(err).catch(function (result) {
        //         alertCtrl.create({
        //           title: '发生未知错误！',
        //           buttons: ['确定']
        //         }).present();
        //       })
        //     });
        // });
        userInfo.menu=ev.LoginWithOutSecurity(nav);
        this.storage.set("userInfo", userInfo)
            .then(function () {
              GlobalConfig.USERINFO = (result as UserInfo);
              nav.setRoot(HomePage);
            })
      })
      .catch(err => {
        GlobalConfig.handleError(err).catch(function (result) {
          alertCtrl.create({
            title: '用户信息获取失败！',
            buttons: ['确定']
          }).present();
        })
      });
  }

  private getMenu(userAccount: string) {
    return this.http.get(GlobalConfig.ApiURL + this.menuUrl + userAccount)
      .toPromise()
      .then(result => {
        let navs = [];
        for (let resource of result as Array<Resource>) {
          let res = new Resource();
          res.id = resource.id;
          res.menuIcon = resource.menuIcon;
          res.name = resource.name;
          res.url = resource.url;
          navs.push(res)
        }

        return navs;
      });
  }
}
