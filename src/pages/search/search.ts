import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProfilPage} from "../profil/profil";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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

  users;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
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

    console.log(`Ok Contact : ${user.prenom}  avec l' ID : ${user.id} a été ajouté`);
  }


  public goToUserProfil(user) {

      this.navCtrl.push(ProfilPage, user)

  }

  getUsers() {
    this.userService.getUsers()
      .then(data => {
        this.users = data;
      });
  }

  ionViewWillEnter() {

    this.getUsers();
  }

}
