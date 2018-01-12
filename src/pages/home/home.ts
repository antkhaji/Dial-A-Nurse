import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AddjobPage } from '../addjob/addjob';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public googleplus: GooglePlus, private auth: AngularFireAuth) {

  }

  login() {
    this.googleplus.login({
      'webClientId': '959246712630-8ht9qfsrlkclb04lcbhuk3vmf5iu5k6m.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          alert("Login success")
        }).catch(ns => {
          alert("Not Success")
        })
    })
  }

  signOut() {
    this.auth.auth.signOut();
  }

  addJob() {
    this.navCtrl.push(AddjobPage);
  }

}
