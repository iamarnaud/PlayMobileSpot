import { Component } from '@angular/core';

import { ProfilPage } from '../profil/profil';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SearchPage} from "../search/search";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilPage;
  tab2Root = HomePage;
  tab3Root = ContactPage;
  tab4Root = SearchPage;

  constructor() {

  }
}
