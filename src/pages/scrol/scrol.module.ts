import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrolPage } from './scrol';
import { PipesModule } from '../../pipes/pipes.module';




@NgModule({
  declarations: [
    ScrolPage
  ],
  imports: [
    IonicPageModule.forChild(ScrolPage),
    PipesModule
  ],
})
export class ScrolPageModule {}
