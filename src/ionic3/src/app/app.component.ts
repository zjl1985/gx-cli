import {Component} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {Network} from "@ionic-native/network";
import {GlobalConfig} from "./golbal.config";

@Component({
  templateUrl: 'app.html'
})
export class WaterServiceApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public config: GlobalConfig,
              public alertCtrl: AlertController,
              network: Network) {
    GlobalConfig.ApiURL = '';
    platform.ready().then(() => {
      network.onDisconnect().subscribe(() => {
          alertCtrl.create({
            title: '网络连接断开!',
            buttons: ["确定"]
          }).present();
        },
        (error) => GlobalConfig.handleError);

      network.onConnect().subscribe(() => {
          GlobalConfig.ApiURL = '';
        },
        (error) => GlobalConfig.handleError);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
