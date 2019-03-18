import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular";
import {HttpClient} from '@angular/common/http';
import {GlobalConfig} from "../../app/golbal.config";
import {Resource} from "./homeEntity";
import {DataMonitoringPage} from "../datamonitoring/datamonitoring";
import {AlarmPage} from "../alarm/alarm";
import {DevicePage} from "../device/device";
import {EntranceguardPage} from "../entranceguard/entranceguard";
import {ReportPage} from "../report/report";
import {UserInfoPage} from "../userinfo/userinfo";
import {LoginStatus} from "../login/loginEntity";

@Component({
  selector: "home-page",
  templateUrl: "home.html"
})
export class HomePage {
  public navs: Array<Resource>;

  constructor(public navCtrl: NavController,
              private events: Events,
              private http: HttpClient) {
    this.navs = [];
    for (let menu of GlobalConfig.USERINFO.menu) {
      menu.url = HomePage.changePage(menu.url)
      this.navs.push(menu);
    }
  }

  ionViewDidLoad() {
    this.listenEvents();
  }

  ionViewWillUnload() {
    this.events.unsubscribe('toUserInfo');
  }

  listenEvents() {
    this.events.subscribe('toUserInfo', () => {
      this.navCtrl.push(UserInfoPage);
    });
  }

  private static changePage(type: string): any {
    if (type === "DataMonitoringPage") {
      return DataMonitoringPage;
    } else if (type === "AlarmPage") {
      return AlarmPage;
    } else if (type === "DevicePage") {
      return DevicePage;
    } else if (type === "EntranceguardPage") {
      return EntranceguardPage;
    } else if (type === "ReportPage") {
      return ReportPage;
    }
  }


}
