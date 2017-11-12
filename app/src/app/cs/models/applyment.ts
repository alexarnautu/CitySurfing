import { Review } from 'app/cs/models/review';

export class Applyment {
    userId: string;
    jobId: string;
    proposal: string;
    isApproved: boolean;
    review: Review;
}
