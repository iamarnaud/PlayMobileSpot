import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams} from 'ionic-angular';

//pour Auth
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {AuthProvider} from '../../providers/auth/auth';

import {TabsPage} from "../tabs/tabs";
import {GeolocationProvider} from "../../providers/geolocation/geolocation";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //cree une reference pour l'objet form group
  public form: FormGroup;
  myposition;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  public alertCtrl: AlertController,
    private _FormBuilder: FormBuilder,
    private _AUTH: AuthProvider,
    public geoposition: GeolocationProvider
  ) {

    // on utilise le form builder d'angular pour définir le form group
    this.form = this._FormBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
   // this.myposition = geoposition.getUserPosition(); // eric@TODO penser à storer la postision en base
  }

  /**
   * Log in using the loginWithEmailAndPassword method
   * from the AuthProvider service (supplying the email
   * and password FormControls from the template via the
   * FormBuilder object
   * @method logIn
   * @return {none}
   */
  logIn(): void {
    let email: any = this.form.controls['email'].value,
      password: any = this.form.controls['password'].value;

    this._AUTH.loginWithEmailAndPassword(email, password)
      .then((auth: any) => {
        this.navCtrl.setRoot(TabsPage);
      })

      .catch((error : any) =>
      {
        let alert = this.alertCtrl.create({
          title: 'Oopsy!',
          subTitle: error.message,
          buttons: ['Réessayer']
        });
        alert.present();

      });

  }
}


