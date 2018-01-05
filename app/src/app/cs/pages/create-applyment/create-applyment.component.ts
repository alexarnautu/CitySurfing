import { Component, OnInit } from '@angular/core';
import { ApplymentsService } from 'app/cs/services/applyments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'create-applyment',
  templateUrl: './create-applyment.component.html',
  styleUrls: ['./create-applyment.component.scss'],
  providers: [ApplymentsService]
})
export class CreateApplymentComponent implements OnInit {

  proposalText: string;

  constructor(private applyService: ApplymentsService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  submit() {
    this.applyService.applyTo(this.route.snapshot.queryParams.id, this.proposalText)
    .subscribe(success => {
      // TODO notify success
    }, error => {
        if (error.status == 409 /*Conflict*/) {
          // TODO Display modal, "You already applied to this job"
        }
    });
  }

}
