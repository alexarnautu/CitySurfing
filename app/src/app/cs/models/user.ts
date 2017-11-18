import {Skill} from './skill';

export class User {
  Id: string;
  Email: string;
  FullName: string;
  About: string;
  PhoneNumber: string;
  Skills: Skill[];
}
