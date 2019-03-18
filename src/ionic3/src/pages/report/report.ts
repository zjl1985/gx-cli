import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'report-page',
  templateUrl: 'report.html'
})
export class ReportPage {

  constructor(public navCtrl: NavController,
              private events: Events) {

  }

  openUserInfo() {
    this.events.publish('toUserInfo');
  }
}
