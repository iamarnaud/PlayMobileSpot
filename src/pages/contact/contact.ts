import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsProvider} from "../../providers/items/items";
import { User} from "../../app/models/User";
import { AlertController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {ProfilPage} from "../profil/profil";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts;
  users;
  userCurrent;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public userService: ItemsProvider ,public authUser: AuthProvider) {
    this.getContacts()
  }
  showConfirm(user) {
    let confirm = this.alertCtrl.create({
      title: 'Ne plus suivre',
      message: 'Êtes vous sûr de vouloir supprimer ce contact ?',
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            console.log('Disagree clicked');
            this.delContact(user);
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

  // run automatiquement
  ionViewDidEnter() {
    this.getContacts()
  }

  getContacts () {

  this.userService.getUsers().subscribe(users=>{
    this.users = users;
    this.userCurrent =  this.users.filter( (data) => data.uid ===  this.authUser.userCurrent.uid )[0];
    this.contacts = this.userCurrent.contacts;
    });

  }

  public goToUserProfil(user) {
    this.navCtrl.push(ProfilPage, user)
  }


  public delContact(user) {
    this.userService.getUsers().subscribe(users=> {
      this.users = users;
      this.userCurrent =  this.users.filter( (data) => data.uid ===  this.authUser.userCurrent.uid )[0];
    })
    this.userService.delContact(user, this.authUser.theUSER);
  }

}
