import { User} from "../../app/models/User";

export class Image extends User{
  id?:null;
  lien?:string;
  description?:string;
  like?:number;
  commentaire?:object;
}
