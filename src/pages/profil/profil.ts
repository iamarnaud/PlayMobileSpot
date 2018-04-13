import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

id: number = 0 ; // A Changer et faire un setter avec ID AUTH
user: object;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams , public userService : UserServiceProvider) {

    if(typeof(navParams.get('id')) !== 'undefined' ) {
      this.id = navParams.get('id')
    };
    this.getUsers();
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


  getUsers() {
    this.userService.getUsers()
      .then(data => {
        this.user = data[this.id];
      });
  }


}
