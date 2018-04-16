import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Geolocation} from "@ionic-native/geolocation";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // latitude:any;
  // longitude:any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public camera: Camera, public geo : Geolocation) {
  }

  takePicture(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    })
    .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

//   ionViewDidLoad(){
//     this.geo.getCurrentPosition().then(pos =>{
//     this.latitude=pos.coords.latitude;
//   this.longitude = pos.coords.longitude;
// }).catch( err => console.log(err));
}
