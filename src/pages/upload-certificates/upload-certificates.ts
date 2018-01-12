import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import * as Enums from '../../app/enums';

/**
 * Generated class for the UploadCertificatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-certificates',
  templateUrl: 'upload-certificates.html',
})
export class UploadCertificatesPage {

	nurseDetails = {

	}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: Transfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCertificatesPage');
  }

  uploadCerts() {

  }

  upload() {

  }

  uploadresume() {
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        const fileTransfer: TransferObject = this.transfer.create();
        // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
        let options1: FileUploadOptions = {
          fileKey: 'image_upload_file',
          fileName: 'name.pdf',
          headers: {},
          params: { "app_key": "Testappkey", 'fileName': 'name.pdf'},
          chunkedMode: false

        }

        fileTransfer.upload(uri, Enums.apiUrl.url + 'upload-certificate', options1)
          .then((data) => {
            // success
            alert("success" + JSON.stringify(data));
          }, (err) => {
            // error
            alert("error" + JSON.stringify(err));
          });

      })
      .catch(e => console.log(e));
  }

}
