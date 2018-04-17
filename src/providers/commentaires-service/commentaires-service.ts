import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Commentaire } from '../../app/models/Commentaire';
import {Observable} from "rxjs/Observable";


/*
  Generated class for the ComentairesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentairesServiceProvider {

 commentaireCollection: AngularFirestoreCollection<Commentaire>;
  commentaires: Observable<Commentaire[]>

  constructor(public afs:AngularFirestore) {
    this.commentaires = this.afs.collection('commentaires').valueChanges();
  }

  getCommentaires(){
    this.commentaires = this.afs.collection('commentaires').valueChanges();
    return this.commentaires;
  }

}
