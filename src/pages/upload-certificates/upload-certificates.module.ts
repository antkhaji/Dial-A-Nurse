import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadCertificatesPage } from './upload-certificates';

@NgModule({
  declarations: [
    UploadCertificatesPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadCertificatesPage),
  ],
})
export class UploadCertificatesPageModule {}
