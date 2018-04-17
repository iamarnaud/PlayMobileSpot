import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Image } from '../../app/models/Image';
import {Observable} from "rxjs/Observable";
/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {

  imageDocument: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>

  constructor(public afs:AngularFirestore) {
    this.images = this.afs.collection('images').valueChanges();
  }

  getImages(){
    this.images = this.afs.collection('images').valueChanges();
    return this.images;
  }

}

