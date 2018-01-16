import {User} from './user'
export class Review {
  Id: number;
  Rating: number;
  Title: string;
  Comment: string;
  UserFrom: User;
  UserFromId: string;
  UserTo: User;
  UserToId;
}
