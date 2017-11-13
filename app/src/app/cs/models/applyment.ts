import { Review } from './review';

export class Applyment {
   UserId: string;
   JobId: number;
   Proposal: string;
   IsApproved: boolean;
   Review: Review;
}
