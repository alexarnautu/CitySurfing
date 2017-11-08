import { Injectable } from '@angular/core';
import { JobListingItem} from './job-listing-item';
import { JOB_LISTING_ITEMS } from './mock-jobs';

@Injectable()
export class JobListingService {
  constructor() { }

  getJobs(): JobListingItem[] {
    return JOB_LISTING_ITEMS;
  }
}
