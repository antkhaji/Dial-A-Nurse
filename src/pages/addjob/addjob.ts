import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
//mport {MenuPage} from '../menu/menu';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the AddjobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addjob',
  templateUrl: 'addjob.html',
})
export class AddjobPage {

addjobData = {
    description: '',
    title: '',
    location: '',
    amount: '',
    date: '',
    firebase_id: '',
  }
  constructor(private datePicker: DatePicker, public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public http: Http,public loadingCtrl: LoadingController) {
  	let user = firebase.auth().currentUser;
  	this.addjobData.firebase_id = user.uid;;
    //this.datepick();
  }



  placeJob(){
  	let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    let headers = new Headers();
    headers.append('Content-Type','application/json');

        this.http.post('http://45.55.89.112/api/dial-a-nurse/post-job',JSON.stringify(this.addjobData),{headers: headers}).map(res => res.json()).subscribe(data=>{
        let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });

        loader.dismiss();
        toast.present();
        this.navCtrl.setRoot('MenuPage');

        },error => {
         console.log("Oooops!");
         alert("Error connecting to server. Please check your internet connection and try again");
         loader.dismiss();
         })
  }

  datepick(){
  	this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }


}
