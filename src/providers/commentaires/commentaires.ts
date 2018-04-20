
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Commentaire} from "../../app/models/commentaire";

/*
  Generated class for the CommentairesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentairesProvider {

  commentaireCollection: AngularFirestoreCollection<Commentaire>;
  commentaires: Observable<any[]>

  constructor(public afs:AngularFirestore) {
    this.commentaires = this.afs.collection('commentaires').valueChanges();
  }

  getCommentaires(){
    this.commentaires = this.afs.collection('commentaires').valueChanges();
    return this.commentaires;
  }

}
