import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataMonitoringChartPage} from "../chart/chart";
import {UserInfoPage} from "../../userinfo/userinfo";

@Component({
  selector: 'datamonitoring-detail-page',
  templateUrl: 'detail.html'
})
export class DataMonitoringDetailPage {

  constructor(public navCtrl: NavController) {

  }

  openChart(item) {
    this.navCtrl.push(DataMonitoringChartPage, {
      item: item
    })
  }

  userInfo(){
    this.navCtrl.push(UserInfoPage);
  }
}
