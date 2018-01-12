import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseLocatorPage } from './nurse-locator';

@NgModule({
  declarations: [
    NurseLocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(NurseLocatorPage),
  ],
})
export class NurseLocatorPageModule {}
