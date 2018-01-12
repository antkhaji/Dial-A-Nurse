import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseAccountFormPage } from './nurse-account-form';

@NgModule({
  declarations: [
    NurseAccountFormPage,
  ],
  imports: [
    IonicPageModule.forChild(NurseAccountFormPage),
  ],
})
export class NurseAccountFormPageModule {}
