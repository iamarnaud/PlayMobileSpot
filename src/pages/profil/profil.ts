import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {ItemsProvider} from "../../providers/items/items";

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  UID = 'MZEihsJOwXfCYizAb7NAiOjTvbG2' ; // A Changer et faire un setter avec ID AUTH
  user: object;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public userService: ItemsProvider
  ) {

    if (typeof(navParams.get('UID')) !== 'undefined') {
      this.UID = navParams.get('UID')
    }else{
      this.UID = 'MZEihsJOwXfCYizAb7NAiOjTvbG2';
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
    this.userService.getUsers().subscribe(data => {

     this.user =  data.filter( elem => {
        return elem.UID === this.UID;
      });
      // Transforme le tebleau en objet
      this.user = this.user[0]

    })
  }


}
