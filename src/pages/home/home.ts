import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {CommentsPage} from '../comments/comments';
import {ItemsProvider} from "../../providers/items/items";
import {CommentairesProvider} from "../../providers/commentaires/commentaires";
import {ImagesProvider} from "../../providers/images/images";

import {User} from "../../app/models/User";
import {Image} from "../../app/models/Image";
import {Commentaire} from "../../app/models/Commentaire";
import {AuthProvider} from "../../providers/auth/auth";
import {sourceInfo} from "@angular/compiler-cli/src/metadata/evaluator";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  users: User[];
  images;
  description;
  source;
  commentaires: Commentaire[];
  public base64Image: string;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public userService: ItemsProvider,
              public imagesService: ImagesProvider,
              public comService: CommentairesProvider,
              public authUser: AuthProvider,
              public alertCtrl: AlertController,
  ) {

  }
  like(image){
    image.like ++;
  }

  goToCommentsPage() {
    this.navCtrl.push(CommentsPage);
  }

  takePicture(type: string) {

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: (type === 'camera') ? this.camera.PictureSourceType.CAMERA : ((type === 'albums') ? this.camera.PictureSourceType.PHOTOLIBRARY : -1) ,
     // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1000,
      targetHeight: 1000,
      mediaType: this.camera.MediaType.ALLMEDIA

    })
      .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      })

      .then(imageData => {
        return this.addDescription();
      })
      .then(imageData => {
        this.imagesService.addImage(
          {
            userCurrent: this.authUser.theUSER,
            image: this.base64Image ? this.base64Image : "",
            like: 0,
            timestamp: Date.now(),
            description: this.description ? this.description : "Description non définie"
          }
        );

      }, (err) => {
        console.log(err)
      })
  }

  ngOnInit() {
    this.getAllInfos()
  }


  timeConverter(timestamp) {
    let a = new Date(timestamp);
    let months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = date + ' ' + month + ' ' + year + ' à ' + hour + 'h' + min;
    return time;
  }


  ionViewDidEnter() {

    this.getAllInfos()
  }

  getAllInfos() {
    this.userService.getUsers().subscribe(users => {

      this.users = users;


    });
    this.imagesService.getImagesDesc().subscribe(images => {

      this.images = images;

    });

  }


  addDescription(): Promise<any>  {
    return new Promise((resolve, reject) => {

    let alert = this.alertCtrl.create({
      title: 'Description',
      inputs: [
        {
          name: 'description',
          placeholder: 'Description'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            this.description = ""
            reject("Opération annulée");
          }
        },
        {
          text: 'Valider',
          handler: data => {
            this.description = data.description
            resolve(this.description);
          }
        }
      ]
    });
    alert.present();



    });

  }


}
