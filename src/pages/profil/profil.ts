import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private navParams: NavParams) {
    let user = navParams.get('user');
    console.log(user);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: "Confirmation",
      message: "Etes-vous sur de vouloir vous déconnecter ?",
      buttons: [{
        text: "Oui",
        handler: () => {
          this.navCtrl.setRoot(LoginPage);
        }
      },
        {
          text: "Non",
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
}
