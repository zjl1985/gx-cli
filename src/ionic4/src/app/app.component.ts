import {Component} from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Network} from '@ionic-native/network/ngx';
import {GlobalConfig} from './golbal.config';

declare var screen: any;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private network: Network,
        public alertCtrl: AlertController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        const self = this;
        this.platform.ready().then(() => {
            self.network.onDisconnect().subscribe(() => {
                    self.alertMsg().then();
                },
                (error) => GlobalConfig.handleError);

            self.statusBar.styleDefault();
            setTimeout(function () {
                self.splashScreen.hide();
            }, 500);

            // 锁定到主竖屏，禁止横屏
            screen.orientation.lock('portrait-primary').then();
            GlobalConfig.echarts.registerTheme('chalk', GlobalConfig.echartsTheme);
        });
    }

    async alertMsg() {
        const alert = await this.alertCtrl.create({
            message: '网络连接已断开!',
            buttons: ['确定']
        });

        await alert.present();
    }
}
