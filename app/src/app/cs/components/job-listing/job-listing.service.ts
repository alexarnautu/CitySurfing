import { Injectable } from '@angular/core';
import { JobListingItem} from './job-listing-item';
import { JOB_LISTING_ITEMS } from './mock-jobs';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

@Injectable()
export class JobListingService {
  constructor() { }

  getJobs(): Observable<JobListingItem[]> {
    return of(JOB_LISTING_ITEMS);
  }
}
