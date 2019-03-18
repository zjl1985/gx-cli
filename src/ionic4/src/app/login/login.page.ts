import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Network} from '@ionic-native/network/ngx';
import {GlobalConfig} from '../golbal.config';
import {LoginStatus, UserInfo} from './loginEntity';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private loginUrl = '/basic/xinhai/login';
    private userInfoUrl = '/basic/users/userbyaccount';

    constructor(private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private storage: Storage,
                private http: HttpClient,
                private loadingCtrl: LoadingController,
                public network: Network,
                private router: Router) {
    }

    ngOnInit() {
        if (this.network.type !== 'none') {
            this.storage.get('userInfo').then(result => {
                if (result != null && (result as UserInfo).id != null) {
                    GlobalConfig.USERINFO = (result as UserInfo);
                    this.router.navigateByUrl('/home').then();
                }
            });
        }
    }

    async logIn(username: HTMLInputElement, password: HTMLInputElement) {
        let msg = null;
        if (username.value === '') {
            msg = await this.toastCtrl.create({
                message: '请输入用户名',
                duration: 2000,
                position: 'top',
                cssClass: 'alert-info'
            });

            msg.present().then();
            return;
        }

        if (password.value === '') {
            msg = await this.toastCtrl.create({
                message: '请输入密码',
                duration: 1000,
                position: 'top',
                cssClass: 'alert-info'
            });

            msg.present().then();
            return;
        }

        const alertCtrl = this.alertCtrl;
        msg = await this.loadingCtrl.create({
            message: '正在登录...'
        });

        this.router.navigateByUrl('/home').then();
        this.http.get(GlobalConfig.ApiURL + this.loginUrl + '/' + username.value + '/' + password.value)
            .toPromise()
            .then(result => {
                msg.dismiss().then(async () => {
                    if ((result as LoginStatus).failed) {
                        const alert = await alertCtrl.create({
                            message: (result as LoginStatus).msg,
                            buttons: ['确定']
                        });

                        alert.present().then();
                    } else {
                        this.login(username, alertCtrl);
                    }
                });
            })
            .catch(err => {
                msg.dismiss().then(() => {
                    GlobalConfig.handleError(err).catch(async function () {
                        const alert = await alertCtrl.create({
                            message: '登录失败，请检查网络连接！',
                            buttons: ['确定']
                        });

                        alert.present().then();
                    });
                });
            });
    }

    private login(username: HTMLInputElement, alertCtrl) {
        const ev = this;
        this.http.get(GlobalConfig.ApiURL + this.userInfoUrl + '/' + username.value)
            .toPromise()
            .then(result => {
                const userInfo = result as UserInfo;
                GlobalConfig.USERINFO = userInfo;
                ev.storage.set('userInfo', userInfo)
                    .then(function () {
                        ev.router.navigateByUrl('/home').then();
                    })
                    .catch(err => {
                        GlobalConfig.handleError(err).catch(function () {
                            alertCtrl.create({
                                title: '发生未知错误！',
                                buttons: ['确定']
                            }).present();
                        });
                    });
            })
            .catch(err => {
                GlobalConfig.handleError(err).catch(function () {
                    alertCtrl.create({
                        title: '用户信息获取失败！',
                        buttons: ['确定']
                    }).present();
                });
            });
    }

}
