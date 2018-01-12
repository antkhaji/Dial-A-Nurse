import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';


/*
  Generated class for the NursejobsdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NursejobsdataProvider {
  //jobs:any;
  jobsList: any = [];
  slidesdata: any = [];
  posts: any = [];
  perpage: number = 5;
  uid: string;
  private apiUrl: string = 'https://reqres.in/api/';

  constructor(public http: Http, private auth: AngularFireAuth) {
    console.log('Hello NursejobsdataProvider Provider');

  }

  getRemoteData() {

    this.http.get('http://45.55.89.112/api/dial-a-nurse/get-job?page=1').map(res => res.json()).subscribe(data => {
      //console.log(data.jobs);
      this.jobsList = data.jobs.data;
      let i = 0;
      for (let v in this.jobsList) {
        if (i < 4) {
          this.slidesdata.push(this.jobsList[v]);
        } else {
          this.posts.push(this.jobsList[v]);
        }
        i++;
      }
      console.log(this.jobsList);
    }, (err) => {
      alert(err);
      //console.log(err);
    });
  }

  load(start: number = 0) {

    return new Promise(resolve => {

      console.log(start);
      this.http.get('http://45.55.89.112/api/dial-a-nurse/get-job?page=' + start)
        .map(res => res.json())
        .subscribe(data => {
          if (data.result == 'error') {
            console.log(data.result);
          } else {
            resolve(data.jobs.data);

          }

        }, (err) => {
          alert(err);
        });
    });
  }
//https://reqres.in/api/users?page
  getUsers(page): Observable<string[]> {
    return this.http.get('http://45.55.89.112/api/dial-a-nurse/get-job?page=' + page)
      .map(res => {
        let body = res.json();
        return body || {};
      })
      .catch(this.handleError2);


  }


  getJobUser(page): Observable<string[]> {
    let user = firebase.auth().currentUser;
    this.uid = user.uid;
    let body = {
          firebase_id: this.uid
        };
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://45.55.89.112/api/dial-a-nurse/get-job-user?page=' + page,JSON.stringify(body),{headers: headers})
    .map(res => {
        let body = res.json();
        return body || {};
      })
      .catch(this.handleError2);

  }


  cancelJob(jobId): Observable<string[]>{
        let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = {
          job_id: jobId
        };
        return this.http.post('http://45.55.89.112/api/dial-a-nurse/cancel-job',JSON.stringify(body),{headers: headers})
        .map(res => {
        let body = res.json();
        return body || {};
      })
      .catch(this.handleError2);
  }

  deleteJob(jobId): Observable<string[]>{
        let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = {
          job_id: jobId
        };
        return this.http.post('http://45.55.89.112/api/dial-a-nurse/delete-job',JSON.stringify(body),{headers: headers})
        .map(res => {
        let body = res.json();
        return body || {};
      })
      .catch(this.handleError2);
  }




  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError2(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    alert(errMsg);
    return Observable.throw(errMsg);
  }


}
