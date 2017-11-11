import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
@Component({
    selector: 'cs-landing-component',
    templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
    jobs: Job[];

    constructor(private jobsService: JobsService) { }

    ngOnInit() {
        this.getLatestJobs();
    }

    getLatestJobs(): void {
        this.jobsService.getJobs()
            .subscribe(jobs => this.jobs = jobs);
    }
}
