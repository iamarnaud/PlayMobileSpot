import { Image } from '../../app/models/Image';
import {Timestamp} from "rxjs/Rx";

export class Commentaire extends Image {
  id?: string;
  auteur?: string;
  date_com?: Timestamp<any>;
  contenu?: string;



}
