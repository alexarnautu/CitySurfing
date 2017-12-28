import { Component, OnInit } from '@angular/core';
import { StyleService } from '../../services/style.service';
import { JobsService } from '../../services/jobs.service';
import { ApplymentsService } from '../../services/applyment.service';
import {Job} from '../../models/job';
import {Applyment} from '../../models/applyment';


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
    jobList: Job[]= [];
    applymentsList: Applyment[] = [];
    activeJobs: Job[] = [];
    pastJobs: Job[] = [];
    activeApplyments: Applyment[] = [];
    pastApplyments: Applyment[] = []

    constructor(private styleService: StyleService, private jobListingService: JobsService,
                private applymentsService: ApplymentsService) {
        styleService.setStyle('no_background');
    }

    getJobs(): void {
        this.jobListingService.getJobs().subscribe(
          jobs => this.jobList = jobs.filter(x=>x.Creator===JSON.parse(localStorage.getItem('currentUser')).Id),
        );
    }

    getApplyments(): void {
        this.applymentsService.getApplyments(JSON.parse(localStorage.getItem('currentUser')).Id).subscribe(
            applyments =>  this.applymentsList = applyments
        );
    }

    ngOnInit() {
        this.getApplyments();
        this.getJobs();
        this.activeJobs.filter(x =>x.IsAvailable==true)
        this.pastJobs.filter(x =>x.IsAvailable==false)
        this.activeApplyments.filter(x=>x.IsApproved==null)
        this.pastApplyments.filter(x=>x.IsApproved!=null)
  }
}
