
import {Review} from './review';
import {User} from './user';
import {Skill} from './skill';
import {Category} from './category';
import {Applyment} from './applyment';

export class Job {
  Id: number;
  Title: string;
  Description: string;
  Price: number;
  StartDate: string;
  EndDate: string;
  Created: string;
  Location: string;
  IsAvailable: boolean;
  Review: Review;
  Creator: User;
  Type: Category;
  RequiredSkills: Skill[];
  Applyments: Applyment[];
}
