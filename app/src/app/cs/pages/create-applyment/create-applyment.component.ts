import { Component, OnInit } from '@angular/core';
import { ApplymentsService } from 'app/cs/services/applyments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'create-applyment',
  templateUrl: './create-applyment.component.html',
  styleUrls: ['./create-applyment.component.scss'],
  providers: [ApplymentsService]
})
export class CreateApplymentComponent implements OnInit {
  sub: any;
  id: any;
  proposalText: string;

  

  constructor(private toasterService: ToasterService, private applyService: ApplymentsService, private router: Router, private route: ActivatedRoute) { }

  config: ToasterConfig;

  position: string = 'toast-top-right';
  animationType: string = 'fade';
  title: string = 'Applyment result!';
  content: string = `I'm cool toaster!`;
  timeout: number = 5000;
  toastsLimit: number = 5;
  type: string = 'default';

  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  types: string[] = ['success', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  quotes = [
     'You have applyed to this job.' ,
     'Error, you are already registred for this job!' ,
  ];
  ngOnInit() {
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  submit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.applyService.applyTo(this.id, this.proposalText)
        .subscribe(success => {
          this.showToast(this.types[0], this.title, this.quotes[0]);
          setTimeout(() => 
          {
            this.router.navigate(['../jobDetail/' + this.id]);
          },
          5000);
        }, error => {
          if (error.status == 409 /*Conflict*/) {
            // TODO Display modal, "You already applied to this job"
            this.showToast(this.types[1], this.title, this.quotes[1]);
          }
        });
    });
  }
}
