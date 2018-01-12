import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NursejobsdataProvider} from '../../providers/nursejobsdata/nursejobsdata';


/**
 * Generated class for the ScrolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scrol',
  templateUrl: 'scrol.html'
})
export class ScrolPage {
  data: any;
  users: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public restApi: NursejobsdataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrolPage');
    this.getUsers();
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
    this.page = this.page+1;
    setTimeout(() => {
      this.restApi.getUsers(this.page)
        .subscribe(
          res => {
            this.data = res;
            this.perPage = this.data.perPage;
            this.totalData = this.data.totalData;
            this.totalPage = this.data.totalPage;
            for(let i=0; i<this.data.jobs.data.length; i++) {
              this.users.push(this.data.jobs.data[i]);
            }
          },
          error =>  this.errorMessage = <any>error);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

}
