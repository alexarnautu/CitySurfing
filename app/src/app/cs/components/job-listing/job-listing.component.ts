import { Component } from '@angular/core';
import { JOB_LISTING_ITEMS } from './mock-jobs';

@Component({
  selector: 'cs-job-listing-component',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})

export class JobListingComponent {
 // item = JOB_LISTING_ITEMS[0];
  jobList = JOB_LISTING_ITEMS;
}
