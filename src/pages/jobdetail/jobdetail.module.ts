import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobdetailPage } from './jobdetail';

@NgModule({
  declarations: [
    JobdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(JobdetailPage),
  ],
})
export class JobdetailPageModule {}
