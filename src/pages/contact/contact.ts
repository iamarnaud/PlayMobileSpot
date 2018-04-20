import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsProvider} from "../../providers/items/items";
import { User} from "../../app/models/User";
import { AlertController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {ProfilPage} from "../profil/profil";

declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts;
  users;
  userCurrent;
  distanceContact;


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

    this.distanceContact =  this.contacts.map( (data) => {
     let dd =  this.calcDistance(new google.maps.LatLng(this.authUser.theUSER.geolocation.latitude, this.authUser.theUSER.geolocation.longitude), new google.maps.LatLng(data.geolocation.latitude, data.geolocation.longitude));

     this.userService.addDistContact(data,dd)
     return dd
    });

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


  public calcDistance(p1, p2) {
    let d = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);

    return d
  }
}
