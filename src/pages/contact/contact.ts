import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Ne plus suivre',
      message: 'Êtes vous sûr de vouloir supprimer ce contact ?',
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Annuler',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
