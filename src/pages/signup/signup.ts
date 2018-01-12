import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {
    this.signupData.email = this.navParams.get('email');
  }

  signup() {
    if (this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Your password and your re-entered password does not match each other.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    // Firebase Signup Code
    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
      .then(auth => {
        // Could do something with the Auth-Response
        console.log(auth);
      })
      .catch(err => {
        // Handle error
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
