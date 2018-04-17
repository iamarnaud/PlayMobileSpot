import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemsProvider} from "../../providers/items/items";
import { User} from "../../app/models/User";
import {Image} from "../../app/models/Image";
import {ImageServiceProvider} from "../../providers/image-service/image-service";
import { Commentaire} from "../../app/models/Commentaire";
import {CommentairesServiceProvider} from "../../providers/commentaires-service/commentaires-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: User[];
  images: Image[];
  commentaires : Commentaire[];

  constructor(public userService: ItemsProvider, public imageService:ImageServiceProvider,public comService: CommentairesServiceProvider) {

  }
  ngOnInit(){
    this.userService.getUsers().subscribe(users=>{

      this.users = users;

    });
  this.imageService.getImages().subscribe(images=>{

    this.images = images;
  });
  this.comService.getCommentaires().subscribe(commentaires=>{

    this.commentaires = commentaires;

  });
}
}
