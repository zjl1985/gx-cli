import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";

import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";

import {WaterServiceApp} from "./app.component";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {LoginPage} from "../pages/login/login";
import {DataMonitoringPage} from "../pages/datamonitoring/datamonitoring";
import {DataMonitoringDetailPage} from "../pages/datamonitoring/detail/detail";
import {DataMonitoringChartPage} from "../pages/datamonitoring/chart/chart";
import {HomePage} from "../pages/homepage/home"
import {GlobalConfig} from "./golbal.config";
import {Network} from "@ionic-native/network";
import {UserInfoPage} from "../pages/userinfo/userinfo";
import {AlarmPage} from "../pages/alarm/alarm";
import {DevicePage} from "../pages/device/device";
import {EntranceguardPage} from "../pages/entranceguard/entranceguard";
import {ReportPage} from "../pages/report/report";

@NgModule({
  declarations: [
    WaterServiceApp,
    LoginPage,
    DataMonitoringPage,
    DataMonitoringDetailPage,
    DataMonitoringChartPage,
    HomePage,
    UserInfoPage,
    AlarmPage,
    DevicePage,
    EntranceguardPage,
    ReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WaterServiceApp, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WaterServiceApp,
    LoginPage,
    DataMonitoringPage,
    DataMonitoringDetailPage,
    DataMonitoringChartPage,
    HomePage,
    UserInfoPage,
    AlarmPage,
    DevicePage,
    EntranceguardPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalConfig,
    Network
  ]
})
export class AppModule {
}
