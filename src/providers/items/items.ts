
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { User } from '../../app/models/User';
import {Observable} from "rxjs/Observable";

//interaction avec firebase


@Injectable()
export class ItemsProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>
  contacts: Observable<User[]>

  constructor(public afs:AngularFirestore) {
    this.users = this.afs.collection('users').valueChanges();
    this.usersCollection = this.afs.collection('users');
  }

  getUsers(){
    this.users = this.afs.collection('users').valueChanges();
    return this.users;
  }

  get


  addContact(user, cUser) {
    cUser.contacts.push(user);

    this.usersCollection.doc(cUser.uid).set(
      {
        uid: cUser.uid,
        age: cUser.age,
        avatar: cUser.avatar,
        geolocation: cUser.geolocation,
        contacts : cUser.contacts,
        nom: cUser.nom,
        prenom: cUser.prenom
      }

      )
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }


  delContact(user, cUser) {
    cUser.contacts = cUser.contacts.filter((data) => {
      return data.uid !== user.uid;
    })

    this.usersCollection.doc(cUser.uid).update(
      {
        uid: cUser.uid,
        age: cUser.age,
        avatar: cUser.avatar,
        geolocation: cUser.geolocation,
        contacts : cUser.contacts,
        nom: cUser.nom,
        prenom: cUser.prenom
      }

    )
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }


}
