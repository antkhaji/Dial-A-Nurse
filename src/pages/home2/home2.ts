import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddjobPage } from '../addjob/addjob';
//import {JobdetailPage} from '../jobdetail/jobdetail';
import { NursejobsdataProvider } from '../../providers/nursejobsdata/nursejobsdata';


/**
 * Generated class for the Home2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html'
})

export class Home2Page {
  //items:any = [];
  public pagingEnabled: boolean = true;
  public people: any = [];
  private start: number = 1;
  jobsList2: any = [];
  data: any;
  users: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  title: string;
  constructor(public restApi: NursejobsdataProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

    //this.doRefresh(0);
    //this.loadJobs();
    this.getUsers();

  }

  addJob() {
    this.navCtrl.push(AddjobPage);
  }

  detail(id) {
    this.jobsList2 = this.users.filter(function(person) { return person['id'] == id });
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


  doRefresh(refresher) {
    this.pagingEnabled = true;
    this.page = 1;
    this.users.length = 0;
    if (refresher != 0) {
      setTimeout(() => {

        this.restApi.getUsers(1)
          .subscribe(
          res => {

            this.data = res;
            this.users = this.data.jobs.data;
            this.perPage = this.data.perPage;
            this.totalData = this.data.totalData;
            this.totalPage = this.data.totalPage;
          },
          error => this.errorMessage = <any>error);
        console.log('Refresher');
        refresher.complete();
      }, 500);
    }



  }


  getUsers() {
    this.restApi.getUsers(this.page)
      .subscribe(
      res => {
        this.data = res;
        this.users = this.data.jobs.data;
        this.perPage = this.data.perPage;
        this.totalData = this.data.totalData;
        this.totalPage = this.data.totalPage;
      },
      error => this.errorMessage = <any>error);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.restApi.getUsers(this.page)
        .subscribe(
        res => {
          this.data = res;
          this.perPage = this.data.perPage;
          this.totalData = this.data.totalData;
          this.totalPage = this.data.totalPage;
          for (let i = 0; i < this.data.jobs.data.length; i++) {
            this.users.push(this.data.jobs.data[i]);
          }
        },
        error => this.errorMessage = <any>error);

      // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }



}
