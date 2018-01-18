import {Component, OnInit} from '@angular/core';

import {Job} from '../../models/job';
import { JobsService } from '../../services/jobs.service';

/* @TODO Remove */
// import { JobListingService } from './job-listing.service';
// import { JobListingItem } from './job-listing-item';

@Component({
  selector: 'cs-job-listing-component',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})

export class JobListingComponent implements OnInit {

  jobList: Job[];

  constructor(private jobListingService: JobsService) { }

  getJobs(): void {
    var meUser = JSON.parse(localStorage.getItem('currentUser')).Id;
    this.jobListingService.getJobs().subscribe(
      jobs => { 
        this.jobList = jobs.filter(x => x.IsAvailable === true);
        this.jobList.forEach(x => x.IsOwnJob = x.Creator.Id == meUser);
      },
    );
  }
  ngOnInit() {
    this.getJobs();
  }
}
