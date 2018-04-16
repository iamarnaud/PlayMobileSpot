import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CommentsPage } from '../comments/comments';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  public base64Image: string;

  constructor(public navCtrl: NavController, public camera: Camera) {
  }

  goToCommentsPage() {
    this.navCtrl.push(CommentsPage);
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
}
