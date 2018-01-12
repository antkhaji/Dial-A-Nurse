import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
import {Http, Headers} from '@angular/http';
import {Storage} from '@ionic/storage';

import {SignupPage} from '../signup/signup';
//import {MenuPage} from '../menu/menu';
import 'rxjs/add/operator/map';



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  }
  profilePicture: any = "https://www.gravatar.com/avatar/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleplus: GooglePlus, private afAuth: AngularFireAuth, private toastCtrl: ToastController,public loadingCtrl: LoadingController, public http: Http, public storage: Storage) {
  }

  googlelogin() {
        let headers = new Headers();
    headers.append('Content-Type','application/json');
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    this.googleplus.login({
      'webClientId': '959246712630-8ht9qfsrlkclb04lcbhuk3vmf5iu5k6m.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
        //     this.storage.set('display_name', suc.displayName);
        // this.storage.set('firebase_id', suc.uid);
        // this.storage.set('photo_url', suc.photoURL);
        // this.storage.set('email', suc.email);


        let body = {
          display_name: suc.displayName,
          firebase_id: suc.uid,
          photo_url: suc.photoURL,
          email: suc.email
        };
        this.http.post('http://45.55.89.112/api/dial-a-nurse/create-profile',JSON.stringify(body),{headers: headers}).map(res => res.json()).subscribe(data=>{
         this.storage.set('display_name', data.displayname);
        this.storage.set('firebase_id', suc.uid);
        this.storage.set('photo_url', data.photo_url);
        this.storage.set('email', suc.email);
        this.storage.set('phonenumber', data.phonenumber);
          let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
        },error => {
         console.log("Oooops!");
         })
        }).catch(ns => {
          let toast = this.toastCtrl.create({
            message: ns.message,
            duration: 3000
          });
        toast.present();
        //alert("Not Success")
      })
    })
    loader.dismiss();
  }

  login() {
    //     header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    let headers = new Headers();
    headers.append('Content-Type','application/json');


    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();

    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        // Do custom things with auth
        //this.navCtrl.setRoot('MenuPage');
        //loader.dismiss();



        let body = {
          display_name: auth.displayName,
          firebase_id: auth.uid,
          photo_url: auth.photoURL,
          email: auth.email
        };
        this.http.post('http://45.55.89.112/api/dial-a-nurse/create-profile',JSON.stringify(body),{headers: headers}).map(res => res.json()).subscribe(data=>{
        this.storage.set('display_name', data.displayname);
        this.storage.set('firebase_id', auth.uid);
        this.storage.set('photo_url', data.photo_url);
        this.storage.set('email', auth.email);
        this.storage.set('phonenumber', data.phonenumber);

          let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
        },error => {
         console.log("Oooops!");
         })

      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000
        });
        toast.present();

      });
      loader.dismiss();

  }

  signup() {
    this.navCtrl.push(SignupPage, {email: this.loginData.email});
  }

}
