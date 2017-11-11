import {Component, OnInit} from '@angular/core';

import { JobListingItem } from './job-listing-item';
import { JobListingService } from './job-listing.service';

@Component({
  selector: 'cs-job-listing-component',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})

export class JobListingComponent implements OnInit {

  jobList: JobListingItem[];

  constructor(private jobListingService: JobListingService) { }

  getJobs(): void {
    this.jobListingService.getJobs().subscribe(
      jobs => this.jobList = jobs,
    );
  }

  ngOnInit() {
    this.getJobs();
  }
}
