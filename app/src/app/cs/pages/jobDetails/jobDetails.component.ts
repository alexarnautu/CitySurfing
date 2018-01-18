import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { JobDetailService } from '../../../@core/data/jobDetails.service';
import { StyleService } from '../../services/style.service';

import { Job } from '../../models/job';
import { User } from '../../models/user';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'ngx-jobDetails',
    templateUrl: './jobDetails.component.html',
})

export class JobDetailComponent {
    private id: number;
    private sub: any;
    private jobDetailText: any;
    private job: Job;
    private user: User;
    private isCreator: boolean;
    private creatorEmail: string;
    private jobDate: string;
    private isApproved: boolean;

    constructor(private router: Router, private route: ActivatedRoute, private jobDetail: JobDetailService, private styleService: StyleService) {
        this.job = new Job;
        styleService.setStyle('no_background');
    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Email;
    }

    getUserId(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Id;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.jobDetail.getJobDetail(this.id).subscribe(
                jobDet => {
                    this.job = jobDet;
                    this.creatorEmail = jobDet.Creator.Email;
                    var date = new Date(jobDet.StartDate);
                    this.jobDate = date.toDateString() + "  " + date.getHours() + ":" + date.getMinutes();;
                    if (this.job.Creator.Email === this.getUserEmail()) {
                        this.isCreator = true;
                    }
                    else {
                        this.isCreator = false;
                    }
                    this.isApproved = false;
                    jobDet.Applyments.forEach(element => {
                        if (element.UserId === JSON.parse(localStorage.getItem('currentUser')).Id && element.IsApproved === true) {
                            this.isApproved = true;
                        }
                    });
                }
            );

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    applyHere() {
        this.router.navigate(["../../create-applyment/" + this.id]);
    }

    reviewJob() {
        this.router.navigate(["../../userDetail/" + this.job.Creator.Id]);
    }

    selectApp() {
        this.router.navigate(["selectApplyment/" + this.id]);
    }
}
