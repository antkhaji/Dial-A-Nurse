import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseAccountPage } from './nurse-account';

@NgModule({
  declarations: [
    NurseAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(NurseAccountPage),
  ],
})
export class NurseAccountPageModule {}
