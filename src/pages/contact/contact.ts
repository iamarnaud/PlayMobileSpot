import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsProvider} from "../../providers/items/items";
import { User} from "../../app/models/User";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  users: User[];

  constructor(public navCtrl: NavController, public userService: ItemsProvider) {

  }

  // run automatiquement
  ngOnInit(){
    this.userService.getUsers().subscribe(users=>{
      // console.log(users);
      this.users = users;
    });
  }
}
