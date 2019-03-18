import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'entranceguard-page',
  templateUrl: 'entranceguard.html'
})
export class EntranceguardPage {

  constructor(public navCtrl: NavController,
              private events: Events) {

  }

  openUserInfo() {
    this.events.publish('toUserInfo');
  }
}
