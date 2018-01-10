import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { JobDetailService } from '../../../@core/data/jobDetails.service';
import { StyleService } from '../../services/style.service';

import { Job } from '../../models/job';

@Component({
    selector: 'ngx-jobDetails',
    templateUrl: './jobDetails.component.html',
})

export class JobDetailComponent {
    private id: number;
    private sub: any;
    private jobDetailText: any;
    private job: Job;

    constructor(private route: ActivatedRoute, private jobDetail: JobDetailService, private styleService: StyleService) {
        this.job = new Job;
        styleService.setStyle('no_background');

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.id = +params['id'];
           
        this.jobDetail.getJobDetail(this.id).subscribe (
            jobDet => this.job = jobDet,
        );
        });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
