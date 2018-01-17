import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
 
import { StyleService } from '../../services/style.service';
 
import { CreateJobService } from '../../../@core/data/createJob.service';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
 
@Component({
    selector: 'ngx-createJob',
    templateUrl: './createJob.component.html',
})
 
export class CreateJobComponent {
    loading: boolean = false;
    jobTitleInput: string = '';
    DescriptionInput: string = '';
    PriceInput: Number;
    LocationInput: string = '';
    nullTitle: boolean;
    nullDescription: boolean;
    nullPrice: boolean;
    nullLocation: boolean;
    createError: boolean;
    notLogged: boolean;
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
     'You have created a new job.' ,
     'Error!' ,
  ];
    constructor(private toasterService: ToasterService,protected router: Router, protected createJobService: CreateJobService, private styleService: StyleService) {
        this.nullTitle = false;
        this.nullDescription = false;
        this.nullPrice = false;
        this.nullLocation = false;
        this.createError = false;
        styleService.setStyle('no_background');
        if (this.getUserEmail() === "false") {
            this.notLogged = true;
        }
        else {
            this.notLogged = false;
        }
    }
 
    getUserEmail(): string {
        if (localStorage.getItem('currentUser') === null) {
            return "false";
        }
        else {
            return localStorage.getItem('currentUser').toString();
        }
    }
    
    getUserId(): string {
        if (localStorage.getItem('currentUser') === null) {
            return "false";
        }
        else {
            return JSON.parse(localStorage.getItem('currentUser')).Id;
        }
    }

    createJob() {
        this.loading = true;
        if (this.jobTitleInput.length === 0) {
            this.nullTitle = true;
        }
        if (this.DescriptionInput.length === 0) {
            this.nullDescription = true;
        }
        if (this.PriceInput === null) {
            this.nullPrice = true;
        }
        if (this.LocationInput.length === 0) {
            this.nullLocation = true;
        }
        var userId = this.getUserId();
        this.createJobService.createJob(this.jobTitleInput, this.DescriptionInput, this.PriceInput,
            this.LocationInput, userId).subscribe(
            response => {
                if (response === true) {
                    
                    this.createError = false;
                    this.loading = false;
                    this.showToast(this.types[0], this.title, this.quotes[0]);
                    setTimeout(() => 
                    {
                        this.router.navigate(['index/listing']);
                    },
                    5000);
                } else {
                    this.createError = true;
                    this.loading = false;
                    this.showToast(this.types[1], this.title, this.quotes[1]);
                }
            });
    }
 
    titleChange(newValue): void {
        if (newValue.length > 0) {
            this.nullTitle = false;
        } else {
            this.nullTitle = true;
        }
    }
 
    descriptionChange(newValue): void {
        if (newValue.length > 0) {
            this.nullDescription = false;
        } else {
            this.nullDescription = true;
        }
    }
 
    priceChange(newValue): void {
        if (newValue.length > 0) {
            this.nullPrice = false;
        } else {
            this.nullPrice = true;
        }
    }
 
    locationChange(newValue): void {
        if (newValue.length > 0) {
            this.nullLocation = false;
        } else {
            this.nullLocation = true;
        }
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
}