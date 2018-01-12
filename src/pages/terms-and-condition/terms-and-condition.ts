import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TermsAndConditionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-terms-and-condition',
	templateUrl: 'terms-and-condition.html',
})
export class TermsAndConditionPage {
	terms_and_condition: String;

	constructor(public toastCtrl: ToastController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public loadingCtrl: LoadingController) {
	}

	ionViewWillLoad() {
		this.loadTerms();
	}

	closeModal() {
		this.view.dismiss();
	}

	loadTerms() {
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
			//duration: 3000
		});
		loader.present();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.get('http://45.55.89.112/api/dial-a-nurse/terms-condition').map(res => res.json()).subscribe(data => {
			this.terms_and_condition = data.terms.text;
			loader.dismiss();

		}, error => {
			let toast = this.toastCtrl.create({
				message: error,
				duration: 3000
			});
			toast.present();
			loader.dismiss();

		});

	}

}
