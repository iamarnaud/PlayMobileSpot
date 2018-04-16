import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeoModalPage } from './geo-modal';

@NgModule({
  declarations: [
    GeoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GeoModalPage),
  ],
})
export class GeoModalPageModule {}
