import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {GooglePlus} from '@ionic-native/google-plus';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {MyApp} from './app.component';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {AddjobPage} from '../pages/addjob/addjob';
import {AccountPage} from '../pages/account/account';
import {ProfilePage} from '../pages/profile/profile';
import {NursejobsdataProvider} from '../providers/nursejobsdata/nursejobsdata';
import { ParallaxDirective } from '../directives/parallax/parallax';
import { Transfer } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';

export const firebaseConfig = {
  apiKey: "AIzaSyDKqkabuXFRmPN1rzWHhIYTKE3AEVlNaYk",
  authDomain: "nurse-75acf.firebaseapp.com",
  databaseURL: "https://nurse-75acf.firebaseio.com",
  projectId: "nurse-75acf",
  storageBucket: "nurse-75acf.appspot.com",
  messagingSenderId: "959246712630"

}

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    AddjobPage,
    AccountPage,
    ParallaxDirective,
    ProfilePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    AddjobPage,
    AccountPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    DatePicker,
    File,
    Transfer,
    FileChooser,
    Camera,
    FilePath,
    NursejobsdataProvider
  ]
})
export class AppModule {
}
