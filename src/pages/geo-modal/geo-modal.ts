import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeolocationProvider} from "../../providers/geolocation/geolocation";

/**
 * Generated class for the GeoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-geo-modal',
  templateUrl: 'geo-modal.html',
})



export class GeoModalPage {

  @ViewChild('map') mapElement :ElementRef;

  position;
  timestamp;
  date;
  map: any;
  suivi: boolean = false;
  watch; //suivi mobile



  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocalisation: GeolocationProvider) {
    this.position = navParams.get('coords');
    this.timestamp = navParams.get('timestamp');
    this.watch = geolocalisation.watchPosStart();
  }





  ionViewDidLoad() {
    this.date = this.timeConverter(this.timestamp);
    this.showMap()

  }




  timeConverter(timestamp){
    let a = new Date(timestamp );
    let months = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }



  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

  }



  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  showMap() {
    this.addMap(this.position.latitude,this.position.longitude);
  }


  toogleBtnSuivi () {

    if(this.suivi) {
     this.watch = this.geolocalisation.watchPosStart();

      this.watch = this.watch.subscribe(position => {
         console.log("Service de suivi Activé  !!");
        this.addMap(position.coords.latitude,position.coords.longitude);

       });

    }else{
      this.watchPosStop();
    }

  }


  watchPosStop() {
    this.geolocalisation.watchInitStop();
    this.watch.unsubscribe();
    console.log("Service Stoppé !!")
  }

  dismiss() {
    this.navCtrl.pop();
}

}
