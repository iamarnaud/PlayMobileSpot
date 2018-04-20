import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProfilPage} from "../profil/profil";
import {ItemsProvider} from "../../providers/items/items";
import {User} from "../../app/models/User";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";
import {GeoModalPage} from "../geo-modal/geo-modal";
import {AuthProvider} from "../../providers/auth/auth";


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
  position;
  userCurrent;

  constructor(
    public navCtrl: NavController,
    public userService: ItemsProvider,
    public navParams: NavParams,
    public geolocalisation: GeolocationProvider,
    public geomodal : ModalController,
    public authUser : AuthProvider
  ) {
    this.position =  geolocalisation.getUserPosition().status;
    this.getUsers();
  }


  public getUser(query: any) {

    let val = query.target.value;

    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.prenom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else {
      this.getUsers();
    }
  }


  public addContact(user) {
      this.userService.getUsers().subscribe(users=> {
        this.users = users;
        this.userCurrent =  this.users.filter( (data) => data.uid ===  this.authUser.userCurrent.uid )[0];
      })
    this.userService.addContact(user, this.authUser.theUSER);
  }


  public goToUserProfil(user) {
      this.navCtrl.push(ProfilPage, user)
  }

  public getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users  =  users.filter( (data) => data.uid !==  this.authUser.userCurrent.uid );
    })
  }

  public showMyGeo(){
    let modal = this.geomodal.create(GeoModalPage,this.position);
    modal.present();

  }


  ionViewWillEnter() {

    this.getUsers();

  }

  ionViewDidEnter() {
     this.position = this.geolocalisation.getUserPosition().status;
      console.log(this.position)

  }
}
