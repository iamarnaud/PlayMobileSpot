import { Image } from "../../app/models/Image";
import {Timestamp} from "rxjs/Rx";

export class Commentaire extends Image{
  com?:string;
  date_com?:Timestamp<any>;
  auteur?:string;
}
