import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {exitCodeFromResult} from "@angular/compiler-cli";
import {ProfilPage} from "../profil/profil";

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

  users: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.initialUsers();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  private initialUsers() {
    this.users = [
      {
        id: 1,
        prenom: 'Eric',
        nom: 'Le devedec',
        age: '25',
        avatar: 'http://i.pravatar.cc/150?img=1'
      },
      {
        id: 2,
        prenom: 'Cess',
        nom: 'Dupont',
        age: '25',
        avatar: 'http://i.pravatar.cc/150?img=2'
      },
      {
        id: 3,
        prenom: 'Jean',
        nom: 'Chales',
        age: '25',
        avatar: 'http://i.pravatar.cc/150?img=3'
      }
    ];
    /*    this.users = this.users.map((user) => {

          let prenom = user.prenom;

          return {id : user.id ,prenom : prenom.charAt(0).toUpperCase() + prenom.slice(1)};
        }) */


  }


  public getUser(query: any) {

    let val = query.target.value;

    this.initialUsers();


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

}
