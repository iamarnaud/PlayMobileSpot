import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {ItemsProvider} from "../../providers/items/items";
import {AuthProvider} from "../../providers/auth/auth";
import {Geolocation} from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})

export class ProfilPage {

  UID ;
  user: object;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public userService: ItemsProvider,
    public userAuth: AuthProvider,
    public geolocation: Geolocation
  ) {
    this.getUserAuthIUD();

    if (typeof(navParams.get('UID')) !== 'undefined') {
      this.UID = navParams.get('UID')
    }
    ;

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

      this.user = data.filter(elem => {
        return elem.UID === this.UID;
      });
      // Transforme le tebleau en objet
      this.user = this.user[0]

    })
  }

  getUserAuthIUD() {
    this.UID = this.userAuth.getUserAuthID().uid;
  }


  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }, (err) => {
      console.log(err);
    });
  }
}
