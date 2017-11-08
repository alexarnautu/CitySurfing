import { Component } from '@angular/core';

import { JobListingItem } from './job-listing-item';
import { JOB_LISTING_ITEMS } from './mock-jobs';
import { JobListingService } from './job-listing.service';

@Component({
  selector: 'cs-job-listing-component',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})

export class JobListingComponent {

  jobList: JobListingItem[];

  constructor(private jobListingService: JobListingService) { }

  getJobs(): void {
    this.jobList = this.jobListingService.getJobs();
  }

  ngOnInit() {
    this.getJobs();
  }
}
