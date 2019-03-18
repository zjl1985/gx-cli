import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'device-page',
  templateUrl: 'device.html'
})
export class DevicePage {

  constructor(public navCtrl: NavController,
              private events: Events) {

  }

  openUserInfo() {
    this.events.publish('toUserInfo');
  }
}
