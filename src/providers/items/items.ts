
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { User } from '../../app/models/User';
import {Observable} from "rxjs/Observable";

//interaction avec firebase


@Injectable()
export class ItemsProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(public afs:AngularFirestore) {
    this.users = this.afs.collection('users').valueChanges();
  }

  getUsers(){
    return this.users;
  }

}
