
import { Injectable } from '@angular/core';
import {Geolocation, GeolocationOptions ,Geoposition ,PositionError} from "@ionic-native/geolocation";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  options : GeolocationOptions;
  currentPos : Geoposition;
  shareWatch;
  suiviInit;


  constructor(private geolocation : Geolocation) {
    console.log('Hello GeolocationProvider Provider');
  }



  getUserPosition(){
    this.options = {
      enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;


    },(err : PositionError)=>{
     console.log("error : " + err.message);

    });

    return  {'status' : this.currentPos};
  }


  watchPosStart() {
    this.shareWatch = this.geolocation.watchPosition().share();

    this.suiviInit = this.shareWatch.subscribe(position => {
      console.log("Service de suivi INIT Activé  !!")
    });

    return this.shareWatch;

  }

  watchInitStop () {

    this.suiviInit.unsubscribe();

    console.log("service stoppé")

  }



}
