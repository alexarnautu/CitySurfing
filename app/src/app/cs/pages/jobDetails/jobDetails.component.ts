import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { JobDetailService } from '../../../@core/data/jobDetails.service';
import { StyleService } from '../../services/style.service';

import { Job } from '../../models/job';
import { User } from '../../models/user';

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

    constructor(private route: ActivatedRoute, private jobDetail: JobDetailService, private styleService: StyleService) {
        this.job = new Job;
        styleService.setStyle('no_background');
    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Email;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.jobDetail.getJobDetail(this.id).subscribe(
                jobDet => {
                    this.job = jobDet;
                    if (this.job.Creator.Email === this.getUserEmail()) {
                        this.isCreator = true;
                    }
                    else {
                        this.isCreator = false;
                    }
                }
            );

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
