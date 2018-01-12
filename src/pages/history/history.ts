import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { NursejobsdataProvider } from '../../providers/nursejobsdata/nursejobsdata';

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
	jobs: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  jobsList2: any = [];
	data: any;
  open: boolean;

  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public restApi: NursejobsdataProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.getUsers();
  }

  detail(id) {
    this.jobsList2 = this.jobs.filter(function(person) { return person['id'] == id });
    let params = {
      'title': this.jobsList2[0].title,
      'description': this.jobsList2[0].description,
      'location': this.jobsList2[0].location,
      'amount': this.jobsList2[0].amount,
      'date': this.jobsList2[0].date,
      'id': this.jobsList2[0].id,
      'is_active': this.jobsList2[0].is_active,
      'firebase_id': this.jobsList2[0].firebase_id
    };

    this.navCtrl.push('JobdetailPage', params);
  }

  checkStatus(isactive) {
    if (isactive != 1) {
      return false;
    }
  }


  doRefresh(refresher) {
    this.page = 1;
    this.jobs.length = 0;
    if (refresher != 0) {
      setTimeout(() => {

        this.restApi.getJobUser(1)
          .subscribe(
          res => {

            this.data = res;
            this.jobs = this.data.jobs.data;
            this.perPage = this.data.perPage;
            this.totalData = this.data.totalData;
            this.totalPage = this.data.totalPage;
            //console.log("perpage: "+this.perPage+" Totaldata:" +this.totalData+" Totalpage:" +this.totalPage);
            //console.log(this.users);
          },
          error => this.errorMessage = <any>error);


        refresher.complete();
      }, 500);
    }



  }


  getUsers() {
    this.restApi.getJobUser(this.page)
      .subscribe(
      res => {
        this.data = res;
        this.jobs = this.data.jobs.data;
        this.perPage = this.data.perPage;
        this.totalData = this.data.totalData;
        this.totalPage = this.data.totalPage;
      },
      error => this.errorMessage = <any>error);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.restApi.getJobUser(this.page)
        .subscribe(
        res => {
          this.data = res;
          this.perPage = this.data.perPage;
          this.totalData = this.data.totalData;
          this.totalPage = this.data.totalPage;
          for (let i = 0; i < this.data.jobs.data.length; i++) {
            this.jobs.push(this.data.jobs.data[i]);
          }
          //   console.log("perpage: "+this.perPage+" Totaldata:" +this.totalData+" Totalpage:" +this.totalPage);
          // console.log(this.users);
        },
        error => this.errorMessage = <any>error);

      // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  edit(e, id) {
    e.stopPropagation();
    this.jobsList2 = this.jobs.filter(function(person) { return person['id'] == id });
    let params = {
      'title': this.jobsList2[0].title,
      'description': this.jobsList2[0].description,
      'location': this.jobsList2[0].location,
      'amount': this.jobsList2[0].amount,
      'date': this.jobsList2[0].date,
      'id': this.jobsList2[0].id,
      'is_active': this.jobsList2[0].is_active,
      'firebase_id': this.jobsList2[0].firebase_id
    };
    this.navCtrl.push('EditjobPage', params);
  }

  close(e, id) {
    e.stopPropagation();

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
            this.page = 1;
            this.getUsers();
            loader.dismiss();
          }
        }
      ]
    });
    prompt.present();



  }

  delete(e, id) {
    e.stopPropagation();

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
            this.page = 1;
            this.getUsers();
            loader.dismiss();
          }
        }
      ]
    });
    prompt.present();



  }

}
