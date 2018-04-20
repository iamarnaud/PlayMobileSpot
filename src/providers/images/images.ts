
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from "angularfire2/firestore";
import { Image } from '../../app/models/Image';
import {Observable} from "rxjs/Observable";


/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<any[]>

  constructor(public afs:AngularFirestore) {
    this.images = this.afs.collection('posts').valueChanges();
    this.imagesCollection = this.afs.collection('posts');
  }

  getImagesDesc(){
   return this.afs.collection('posts', (data) => data.orderBy('timestamp', "desc").limit(50) ).valueChanges();
  }

  addImage(post) {
      this.imagesCollection.add(post)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }



}
