import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsProvider} from "../../providers/items/items";
import { User} from "../../app/models/User";
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  users: User[];


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public userService: ItemsProvider) {
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

  // run automatiquement
  ngOnInit(){
    this.userService.getUsers().subscribe(users=>{
      // console.log(users);
      this.users = users;
    });
  }

}
