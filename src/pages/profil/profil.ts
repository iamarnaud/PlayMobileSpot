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

  uid ;
  user: object;
  nbCts;
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


    if (typeof(navParams.get('uid')) !== 'undefined') {
      this.uid = navParams.get('uid')
    }
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
        return elem.uid === this.uid;
      });
      this.user = this.user[0]
      this.nbContacts(this.user);

    })
  }

  getUserAuthIUD() {
    this.uid = this.userAuth. getUserAuthID();

  }


  ionViewDidLoad() {

    this.loadMap();

  }

  ionViewWillEnter() {

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
    this.addMarker();
    }, (err) => {
      console.log(JSON.stringify(err))
     // eric@TODO Verifier géoloc
    });
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    }

  nbContacts (user) {
    if(typeof user !== 'undefined'){
      console.log(user.contacts);
      this.nbCts = user.contacts.length;
    }else{
      this.nbCts = 0;
      console.log(user)
    }


    }
} //balise fin de fonction profil page

