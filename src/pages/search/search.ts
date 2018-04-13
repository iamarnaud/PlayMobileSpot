import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProfilPage} from "../profil/profil";
import {ItemsProvider} from "../../providers/items/items";
import {User} from "../../app/models/User";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  users: User[];

  constructor(public navCtrl: NavController, public userService: ItemsProvider, public navParams: NavParams) {
    this.getUsers();
  }


  public getUser(query: any) {

    let val = query.target.value;

    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.prenom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  public addContact(user) {
    // Eric@TODO à Finir

    console.log(`Ok Contact : ${user.prenom}  avec l' ID : ${user.UID} a été ajouté`);
  }


  public goToUserProfil(user) {
      this.navCtrl.push(ProfilPage, user)
  }



  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  ionViewWillEnter() {

    this.getUsers();
  }



}
