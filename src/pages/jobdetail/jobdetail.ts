import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController
} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NursejobsdataProvider } from '../../providers/nursejobsdata/nursejobsdata';

/**
 * Generated class for the JobdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobdetail',
  templateUrl: 'jobdetail.html',
})
export class JobdetailPage {
  id: number;
  title: string;
  titletopbar: string;
  description: string;
  location: string;
  date: string;
  amount: string;
  owner: string;
  is_active: number;
  firebase_id: string;
  uid: string;
  checkStatus: boolean;
  user: string;
  data: any;
  errorMessage: string;
  is_nurse: number;
  user_is_active: number;
  is_assigned: number;
  is_job_take: boolean = false;
  is_job_mine: boolean = false;


  constructor(private restApi: NursejobsdataProvider, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    let user = firebase.auth().currentUser;
    this.uid = user.uid;
    this.id = this.navParams.get('id');
    // this.title = this.navParams.get('title');
    // this.description = this.navParams.get('description');
    // this.location = this.navParams.get('location');
    // this.amount = this.navParams.get('amount');
    // this.date = this.navParams.get('date');
    // this.is_active = this.navParams.get('is_active');
    //this.firebase_id = this.navParams.get('firebase_id');
    this.getJobs();
    if (this.firebase_id == this.uid) {
      this.checkStatus = true;
    } else {
      this.checkStatus = false;
    }

  }

  checkifUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      id: this.uid
    };
    this.http.post('http://45.55.89.112/api/dial-a-nurse/check-user', JSON.stringify(body), { headers: headers }).map(res => res.json()).subscribe(data => {
      this.is_nurse = data.user.is_nurse;
      console.log(this.is_nurse);

    }, error => {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000
      });
      toast.present();
      console.log("Oooops!");
    });

  }

  accept() {

  }


  getJobs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let loader = this.loadingCtrl.create({
      content: "Getting details from server. Please wait...",
      //duration: 3000
    });
    loader.present();
    let body = {
      id: this.id,
      firebase_id: this.uid
    };
    this.http.post('http://45.55.89.112/api/dial-a-nurse/get-job-detail', JSON.stringify(body), { headers: headers }).map(res => res.json()).subscribe(data => {
      this.title = data.jobs.title;
      this.description = data.jobs.description;
      this.location = data.jobs.location;
      this.date = data.jobs.date;
      this.amount = data.jobs.amount;
      this.is_active = data.jobs.is_active;
      this.firebase_id = data.jobs.firebase_id
      this.is_nurse = data.user.is_nurse;
      this.user_is_active = data.user.is_active;
      this.is_assigned = data.jobs.assigned_to;
      console.log("From api");
      console.log("Nurse:" + this.is_active + "useractive:" + this.user_is_active + " assigned " + this.is_assigned);
      if (this.is_active == 1 && this.is_nurse == 1 && this.user_is_active == 1 && this.is_assigned == 0) {
        this.is_job_take = true;
      } else {
        this.is_job_take = false;
      }
      if (this.is_assigned == data.user.id) {
        this.is_job_mine = true;
      } else {
        this.is_job_mine = false;
      }
      loader.dismiss();

    }, error => {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000
      });
      loader.dismiss();
      toast.present();
      console.log("Oooops!");
    });


  }

  presentActionSheet(id) {
    if (this.is_active == 0) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Options',
        buttons: [
          {
            text: 'Delete job',
            icon: 'trash',
            handler: () => {
              this.delete(id);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: 'close',
            handler: () => {
              console.log(id);
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Options',
        buttons: [
          {
            text: 'edit',
            icon: 'create',
            handler: () => {
              console.log(id);
              this.edit(id);
            }
          }, {
            text: 'Close job',
            icon: 'close-circle',
            handler: () => {
              console.log(id);
              this.close(id);
            }
          }, {
            text: 'Delete job',
            icon: 'trash',
            handler: () => {
              console.log('Archive clicked');
              this.delete(id);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: 'close',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

  }


  edit(id) {

    //this.jobsList2 = this.jobs.filter(function (person) { return person['id'] == id });
    let params = {
      'title': this.title,
      'description': this.description,
      'location': this.location,
      'amount': this.amount,
      'date': this.date,
      'id': this.id,
      'is_active': this.is_active,
      'firebase_id': this.firebase_id
    };
    this.navCtrl.push('EditjobPage', params);
  }

  close(id) {
    //e.stopPropagation();

    let prompt = this.alertCtrl.create({
      title: 'Cancel',
      message: "Canceling a job will remove it from the timeline and it will be inaccessible by health workers. Click Ok to continue",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            let loader = this.loadingCtrl.create({
              content: "Please wait...",
              //duration: 3000
            });
            loader.present();
            this.restApi.cancelJob(id)
              .subscribe(
              res => {
                this.data = res;
                let toast = this.toastCtrl.create({
                  message: this.data.message,
                  duration: 3000
                });
                toast.present();

              },
              error => this.errorMessage = <any>error);

            loader.dismiss();
          }
        }
      ]
    });
    prompt.present();


  }

  delete(id) {
    //e.stopPropagation();

    let prompt = this.alertCtrl.create({
      title: 'Delete',
      message: "Deleting a job removes it from your list of jobs. This process is irrevesible. Do you want to continue?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked');
            let loader = this.loadingCtrl.create({
              content: "Please wait...",
              //duration: 3000
            });
            loader.present();
            this.restApi.deleteJob(id)
              .subscribe(
              res => {
                this.data = res;
                let toast = this.toastCtrl.create({
                  message: this.data.message,
                  duration: 3000
                });
                toast.present();

              },
              error => this.errorMessage = <any>error);
            this.navCtrl.push('MenuPage');
            loader.dismiss();
          }
        }
      ]
    });
    prompt.present();


  }


}
