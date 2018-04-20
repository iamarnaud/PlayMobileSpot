import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

//firebase node package
import * as firebase from "firebase";
import {ItemsProvider} from "../items/items";

firebase


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public userCurrent;
  public users;
  public theUSER;


  constructor(public http: HttpClient, public userService: ItemsProvider) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // pour info dev utilisateur connecté
        console.log("connecté");

      }
      else {
        // pour info dev utilisateur non connecte
        console.log('non connecté');
      }
    });
  }

  /**
   * Use Firebase Web API signInWithEmailAndPassword method
   * to authenticate user login attempt
   *
   * @method loginWithEmailAndPassword
   * @param email    {string}      User e-mail address (gmail)
   * @param password {string}      Gmail address password
   * @return {Promise}
   */

  loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise(((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((val: any) => {
          this.getUserAuthID();
          this.getCurrentUser();
          resolve(val);
        })
        .catch((error: any) => {
          reject(error);
        });
    }));
  }

  /**
   * Log out with Firebase Web API signOut method
   *
   * @method logOut
   * @return {Promise}
   */
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set({ email: email });
      });
  }
  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  getUserAuthID () {

  this.userCurrent = firebase.auth().currentUser;

  return this.userCurrent;

}

 getCurrentUser() {
    this.userService.getUsers().subscribe(users => {
     this.users = users;
      this.theUSER = this.users.filter((data) => data.uid === this.userCurrent.uid)[0];
   })
 }

}
