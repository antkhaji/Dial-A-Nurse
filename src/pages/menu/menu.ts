import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Nav, NavParams} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {Storage} from '@ionic/storage';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';


/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: string = 'Home2Page';
  @ViewChild(Nav) nav: Nav;
  activePage: any;
  displayName: any;
  email: any;
  imageurl: any;
  pic: any;

  pages: Array<{ title: string, pageName?: any, component: any, index?: number, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AngularFireAuth,
              private storage: Storage) {
    let user = firebase.auth().currentUser;

    this.displayName = user.displayName;
    this.email = user.email;
    this.imageurl = user.photoURL;

    this.pages = [
      {title: 'Home', pageName: 'Home2Page', component: 'Home2Page', icon: 'home'},
      {title: 'History', pageName: 'HistoryPage', component: 'HistoryPage', icon: 'list'},
      {title: 'Nurse Locator', pageName: 'NurseLocatorPage', component: 'NurseLocatorPage', icon: 'map'},
      {title: 'Account', pageName: ProfilePage, component: ProfilePage, icon: 'settings'}

    ];
    this.activePage = this.pages[0];
  }

  openPage(page) {

    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = {tabIndex: page.index};
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);

    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);

    }
    this.activePage = page;

  }

  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    this.auth.auth.signOut();
  }

  setDefaultPic() {
    //this.imageurl = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    this.imageurl = "assets/images/placeholdernew.png";
  }

  work(){

  }

  uploadCerts() {

    this.navCtrl.push('UploadCertificatesPage');
  }

}
