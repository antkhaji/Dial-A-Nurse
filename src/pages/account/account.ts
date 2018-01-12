import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Home2Page } from '../home2/home2';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import * as Enums from '../../app/enums';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  @ViewChild(Nav) nav: Nav;
  displayName: any;
  email: any;
  uid: any;

  private url: string = "http://45.55.89.112/api/dial-a-nurse/get-profile";
  firebaseID: any;

  account = {
    email: '',
    displayname: '',
    phone: '',
    first_name: '',
    last_name: '',
    id_number: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, public loadingCtrl: LoadingController, private afDatabase: AngularFireDatabase, private toastCtrl: ToastController, public http: Http, private storage: Storage) {
    let user = firebase.auth().currentUser;
    this.uid = user.uid;
  }

  createProfile() {
    this.auth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.account).then(() => this.nav.push(Home2Page))
    })
  }

  ionViewWillLoad() {
    this.getUserData();
    this.getUserProfile();
  }

  getUserData() {
    // this.storage.get('display_name').then((val) => {
    //   this.account.displayname = val;
    // });
    // this.storage.get('email').then((val) => {
    //   this.account.email = val;
    // });
    // this.storage.get('firebase_id').then((val) => {
    //   this.uid = val;
    // });
    // this.storage.get('phonenumber').then((val) => {
    //   this.account.phone = val;
    // });

  }

  getUserProfile() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      firebase_id: this.uid,
    };
    this.http.post(Enums.apiUrl.url + 'get-profile', JSON.stringify(body), { headers: headers }).map(res => res.json()).subscribe(data => {
      let toast = this.toastCtrl.create({
        message: data.message,
        duration: 3000
      });
      this.account.displayname = data.appuser.display_name;
      this.account.email = data.appuser.email;
      this.account.first_name = data.appuser.first_name;
      this.account.last_name = data.appuser.last_name;
      this.account.phone = data.appuser.phonenumber;
      this.account.id_number = data.appuser.id_number;

      this.storage.set('display_name', data.appuser.display_name);
      this.storage.set('photo_url', data.appuser.photo_url);
      this.storage.set('phonenumber', data.appuser.phonenumber);
      loader.dismiss();
      toast.present();

    }, error => {
      console.log("Oooops!");
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    })

  }

  updateUser() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      display_name: this.account.displayname,
      firebase_id: this.uid,
      email: this.account.email,
      phonenumber: this.account.phone
    };
    this.http.post('http://45.55.89.112/api/dial-a-nurse/update-profile', JSON.stringify(this.account), { headers: headers }).map(res => res.json()).subscribe(data => {
      let toast = this.toastCtrl.create({
        message: data.message,
        duration: 3000
      });
      this.storage.set('display_name', data.displayname);
      this.storage.set('photo_url', data.photo_url);
      this.storage.set('phonenumber', data.phonenumber);
      loader.dismiss();
      toast.present();

    }, error => {
      console.log("Oooops!");
      alert("Error connecting to server. Please check your internet connection and try again");
      loader.dismiss();
    })
  }

  isReadonly() { return true; }

}
