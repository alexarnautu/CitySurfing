import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StyleService } from '../../services/style.service';
import { JobsService } from '../../services/jobs.service';
import { ApplymentsService } from '../../services/applyment.service';
import { Job } from '../../models/job';
import { Applyment } from '../../models/applyment';


@Component({
    selector: 'cs-dashboard-component',
    templateUrl: './dashboard.component.html',
    styles: [`
    .btn-xlarge {
        padding: 18px 40px 45px;
        margin: 20px;
        font-size: 22px;
        line-height: normal;
        -webkit-border-radius: 8px;
           -moz-border-radius: 8px;
                border-radius: 8px;
        }`,
        `.big-text {
        font-size: 20px;`,
    ],
})
export class DashboardComponent implements OnInit {
    allJobs: Job[] = [];
    jobList: Job[] = [];
    applymentsList: Applyment[] = [];
    activeJobs: Job[] = [];
    pastJobs: Job[] = [];
    activeApplymentsJobs: Job[] = [];
    pastApplymentsJobs: Job[] = [];
    acceptedAppymentsJob: Job[] = [];
    // activeApplyments: Applyment[] = [];
    // pastApplyments: Applyment[] = [];

    constructor(private styleService: StyleService, private jobListingService: JobsService,
        private applymentsService: ApplymentsService, private router: Router) {
        styleService.setStyle('no_background');
    }

    getJobs(): void {
        this.jobListingService.getJobs().subscribe(
            jobs => {
                this.allJobs = jobs;
                this.jobList = jobs.filter(x => x.Creator && x.Creator.Id === JSON.parse(localStorage.getItem('currentUser')).Id);
                this.activeJobs = jobs.filter(x => x.Creator && x.Creator.Id === JSON.parse(localStorage.getItem('currentUser')).Id && x.IsAvailable === true);
                this.pastJobs = jobs.filter(x => x.Creator && x.Creator.Id === JSON.parse(localStorage.getItem('currentUser')).Id && x.IsAvailable === false);
                this.activeApplymentsJobs = jobs.filter(x => x.IsAvailable === true && x.Applyments.find(y => y.UserId === JSON.parse(localStorage.getItem('currentUser')).Id));
                this.pastApplymentsJobs = jobs.filter(x => x.IsAvailable === false && x.Applyments.find(y => y.UserId === JSON.parse(localStorage.getItem('currentUser')).Id && y.IsApproved === false));
                this.acceptedAppymentsJob = jobs.filter(x => x.IsAvailable === false && x.Applyments.find(y => y.UserId === JSON.parse(localStorage.getItem('currentUser')).Id && y.IsApproved === true));

                //   this.applymentsService.getApplyments(JSON.parse(localStorage.getItem('currentUser')).Id).subscribe(
                //     applyments =>  {
                //         this.applymentsList = applyments;
                //         //this.activeApplyments = applyments.filter(x => this.allJobs.filter(y => y.IsAvailable === true)) ;
                //         //this.pastApplyments = applyments.filter(x => this.allJobs.filter(y => y.IsAvailable === false));
                //         debugger;
                //     }
                // );
            },
        );
    }

    removeJob(jobId) {
        this.jobListingService.deleteJob(jobId).subscribe(() => window.location.reload());
    }

    removeApplyment(userId, jobId) {
        this.applymentsService.deleteApplyment(userId, jobId).subscribe(() => window.location.reload());
    }


    getJobTitle(jobId) {
        return this.allJobs.filter(x => x.Id == jobId)[0].Title;
    }

    ngOnInit() {
        this.getJobs();
    }
}
