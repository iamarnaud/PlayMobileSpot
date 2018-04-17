import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";


import { ProfilPage } from '../pages/profil/profil';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage} from "../pages/search/search";
import { LoginPage} from "../pages/login/login";
import { CommentsPage } from '../pages/comments/comments';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ItemsProvider } from '../providers/items/items';
import { ImagesProvider } from '../providers/images/images';
import { CommentairesProvider } from '../providers/commentaires/commentaires';

import {Geolocation} from "@ionic-native/geolocation";
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import {GeoModalPage} from "../pages/geo-modal/geo-modal";
import {FormsModule} from "@angular/forms";

import { Camera, CameraOptions } from '@ionic-native/camera';




@NgModule({
  declarations: [
    MyApp,
    ProfilPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    GeoModalPage,
    CommentsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    GeoModalPage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    UserServiceProvider,
    ItemsProvider,
    Geolocation,
    GeolocationProvider,
    Camera,
    ImagesProvider,
    CommentairesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
