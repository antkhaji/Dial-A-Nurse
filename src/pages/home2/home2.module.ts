import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home2Page } from './home2';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    Home2Page
    
  ],
  imports: [
    IonicPageModule.forChild(Home2Page),
    PipesModule
    
  ],
})
export class Home2PageModule {}
