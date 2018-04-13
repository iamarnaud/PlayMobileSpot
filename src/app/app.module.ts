import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { environment} from "../environments/environment";

import { ProfilPage } from '../pages/profil/profil';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage} from "../pages/search/search";
import { LoginPage} from "../pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';

@NgModule({
  declarations: [
    MyApp,
    ProfilPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  //  AngularFireModule.initializeApp(environment.firebase, 'SeecretSpot'),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserServiceProvider
  ]
})
export class AppModule {}
