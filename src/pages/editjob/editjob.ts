import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
/**
 * Generated class for the EditjobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editjob',
  templateUrl: 'editjob.html',
})
export class EditjobPage {
  // id: number;
  // title: string;
  // description: string;
  // location: string;
  // date: string;
  // amount: string;
  // is_active: boolean;
  // firebase_id: string;

  editData = {
    id: this.navParams.get('id'),
    title: '',
    description: '',
    location: '',
    amount: '',
    date: '',
    is_active: this.navParams.get('is_active'),
    firebase_id: this.navParams.get('firebase_id')

  };

  constructor(private datePicker: DatePicker, public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public http: Http,public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.editData.id = this.navParams.get('id');
    this.editData.title = this.navParams.get('title');
    this.editData.description = this.navParams.get('description');
    this.editData.location = this.navParams.get('location');
    this.editData.amount = this.navParams.get('amount');
    this.editData.date = this.navParams.get('date');
    this.editData.is_active = this.navParams.get('is_active');
    this.editData.firebase_id = this.navParams.get('firebase_id');
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

  editJob(){
  	let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    let headers = new Headers();
    headers.append('Content-Type','application/json');

        this.http.post('http://45.55.89.112/api/dial-a-nurse/edit-job',JSON.stringify(this.editData),{headers: headers}).map(res => res.json()).subscribe(data=>{
        let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });

        loader.dismiss();
        this.navCtrl.push('JobdetailPage',this.editData);
        toast.present();
        
        
        },error => {
         console.log("Oooops!");
         alert("Error connecting to server. Please check your internet connection and try again");
         loader.dismiss();
         })
  }

}
