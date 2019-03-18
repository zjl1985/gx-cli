import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'alarm-page',
  templateUrl: 'alarm.html'
})
export class AlarmPage {

  constructor(public navCtrl: NavController,
              private events: Events) {

  }

  openUserInfo() {
    this.events.publish('toUserInfo');
  }
}
