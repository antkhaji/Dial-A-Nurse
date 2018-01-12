import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../pages/login/login';
//import {MenuPage} from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = 'MenuPage';
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

