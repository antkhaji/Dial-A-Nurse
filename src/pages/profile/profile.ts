import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, } from 'ionic-angular';
import * as Enums from '../../app/enums';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	uid: string;
	displayname: string;
	firstname: string;
	lastname: string;
	email: string;
	phonenumber: string;
	idnumber: number;
	no_certs: number;
	imageurl: string;
	is_nurse: boolean = false;


	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public http: Http,
		public toastCtrl: ToastController) {
	}

	ionViewDidLoad() {
		let user = firebase.auth().currentUser;
		this.uid = user.uid;
		this.getNurseProfile();
		console.log('ionViewDidLoad ProfilePage');
	}

	getNurseProfile() {
		let nurseProfile = {
			firebase_id: this.uid

		}
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
			//duration: 3000
		});
		loader.present();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post(Enums.apiUrl.url + 'get-profile', JSON.stringify(nurseProfile), { headers: headers }).map(res => res.json()).subscribe(data => {
			this.displayname = data.appuser.display_name;
			this.firstname = data.appuser.first_name;
			this.lastname = data.appuser.last_name;
			this.email = data.appuser.email;
			this.phonenumber = data.appuser.phonenumber;
			this.idnumber = data.appuser.id_number;
			this.no_certs = data.Certificates;
			this.imageurl = data.appuser.photo_url;
				if(data.appuser.is_nurse == 1) {
				this.is_nurse = true;
			} else {
				this.is_nurse = false;
			}
			console.log(this.is_nurse);
			loader.dismiss();


		}, error => {
			let toast = this.toastCtrl.create({
				message: error,
				duration: 3000
			});
			toast.present();
			loader.dismiss();
		})
	}

	editAccount() {
		let params = {
			'displayname': this.displayname,
			'first_name': this.firstname,
			'last_name': this.lastname,
			'phone_number': this.phonenumber,
			'id_number': this.idnumber,
			'email': this.email,
		}
		this.navCtrl.push('NurseAccountFormPage', params);
	}

	uploadCerts() {
	
		this.navCtrl.push('UploadCertificatesPage');
	}

	setDefaultPic() {
		//this.imageurl = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
		this.imageurl = "assets/images/placeholdernew.png";
	}

}
