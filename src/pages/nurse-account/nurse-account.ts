import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the NurseAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nurse-account',
  templateUrl: 'nurse-account.html',
})
export class NurseAccountPage {

  termsData = {
    terms: false,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  presentModal() {
    let modal = this.modalCtrl.create("TermsAndConditionPage");
    modal.present();
  }

  proceed() {
    let modal = this.modalCtrl.create("NurseAccountFormPage");
    modal.present();
  }

}
