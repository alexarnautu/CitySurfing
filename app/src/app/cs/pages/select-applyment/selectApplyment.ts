import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { JobDetailService } from '../../../@core/data/jobDetails.service';
import { StyleService } from '../../services/style.service';
import { ApplymentsService } from '../../services/applyment.service';

import { Job } from '../../models/job';
import { Applyment } from '../../models/applyment';

@Component({
    selector: 'ngx-selectApplyment',
    templateUrl: './selectApplyment.component.html',
})

export class SelectApplymentComponent {
    private id: number;
    private sub: any;
    private jobDetailText: any;
    private job: Job;
    private applyments: Applyment[];
    private selectedApplyments: Applyment[];

    constructor(private route: ActivatedRoute, private jobDetail: JobDetailService, private applymentsService: ApplymentsService, private styleService: StyleService, private router: Router) {
        this.job = new Job;
        this.router = router;
        styleService.setStyle('no_background');
    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Email;
      }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.jobDetail.getJobDetail(this.id).subscribe (
                jobDet => this.applyments = jobDet.Applyments,
            );
        });
    }

    selectCandidates() {
        let i;
        for(i=0;i<this.selectedApplyments.length;i++) {
            this.applymentsService.approveApplyment(this.id, this.selectedApplyments[i]).subscribe( x => {
                console.log("Applyment approved");
            });
        }
        this.jobDetail.setJobUnavailable(this.id).subscribe(x => {
            console.log("Job set to unavailable");
        });

        this.router.navigate(['index/jobDetail/' + this.id])
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
