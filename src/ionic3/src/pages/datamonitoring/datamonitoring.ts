import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular";
import {DataMonitoringDetailPage} from "./detail/detail";

@Component({
  selector: "datamonitoring-page",
  templateUrl: "datamonitoring.html"
})
export class DataMonitoringPage {
  constructor(public navCtrl: NavController,
              private events: Events) {
  }

  openDetail(item) {
    this.navCtrl.push(DataMonitoringDetailPage, {
      item: item
    });
  }

  openUserInfo() {
    this.events.publish('toUserInfo');
  }
}
