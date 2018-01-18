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

// "YEAR-MM-DD T HH:MM:00.000Z"

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
    Days: string = '';
    Month: string = '';
    Hour: string = '';
    Minutes: string = '';
    invalidDays: boolean = false;
    invalidMonth: boolean = false;
    invalidHour: boolean = false;
    invalidTime: boolean = false;
    invalidMinute: boolean = false;
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
        'You have created a new job.',
        'Error!',
    ];
    constructor(private toasterService: ToasterService, protected router: Router, protected createJobService: CreateJobService, private styleService: StyleService) {
        this.nullTitle = false;
        this.nullDescription = false;
        this.nullPrice = false;
        this.nullLocation = false;
        this.createError = false;
        this.invalidMonth = false;
        this.invalidMinute = false;
        this.invalidHour = false;
        this.invalidDays = false;
        this.invalidTime = false;
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
        if (this.PriceInput === undefined) {
            this.nullPrice = true;
        }
        if (this.LocationInput.length === 0) {
            this.nullLocation = true;
        }
        if (this.Days.length === 0) {
            this.invalidDays = true;
            this.invalidTime = true;
        }
        if (this.Month.length === 0) {
            this.invalidMonth = true;
            this.invalidTime = true;
        }
        if (this.Hour.length === 0) {
            this.invalidHour = true;
            this.invalidTime = true;
        }
        if (this.Minutes.length === 0) {
            this.invalidMinute = true;
            this.invalidTime = true;
        }
        var jobDate = this.getJobDateFromInputs();
        var userId = this.getUserId();
        this.createJobService.createJob(this.jobTitleInput, this.DescriptionInput, this.PriceInput,
            this.LocationInput, userId, jobDate).subscribe(
            response => {
                if (response === true) {

                    this.createError = false;
                    this.loading = false;
                    this.showToast(this.types[0], this.title, this.quotes[0]);
                    setTimeout(() => {
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


    addStringToDate( jobDate: string, addString: string ): string {
        if (addString.length === 1) {
            jobDate = jobDate + '0' + addString;
        }
        else {
            jobDate = jobDate + addString;
        }
        return jobDate;
    }

    getJobDateFromInputs(): string{
        var jobDate = '2018-';
        jobDate = this.addStringToDate(jobDate, this.Month);
        jobDate = jobDate + "-";
        jobDate = this.addStringToDate(jobDate, this.Days);
        jobDate = jobDate + "T";
        jobDate = this.addStringToDate(jobDate, this.Hour);
        jobDate = jobDate + ":";
        jobDate = this.addStringToDate(jobDate, this.Minutes);
        jobDate = jobDate + ":00.000Z";
        return jobDate;
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

    dayChange(newValue): void {
        if (+newValue < 1 || +newValue > 31) {
            this.invalidDays = true;
            this.invalidTime = true;
        }
        else {
            this.invalidDays = false;
            this.invalidTime = false;
        }
    }

    monthChange(newValue): void {
        if (+newValue < 1 || +newValue > 12) {
            this.invalidMonth = true;
            this.invalidTime = true;
        }
        else {
            this.invalidMonth = false;
            this.invalidTime = false;
        }
    }

    hourChange(newValue): void {
        if (+newValue < 0 || +newValue > 24) {
            this.invalidHour = true;
            this.invalidTime = true;
        }
        else {
            this.invalidHour = false;
            this.invalidTime = false;
        }
    }

    minuteChange(newValue): void {
        if (+newValue < 0 || +newValue > 59) {
            this.invalidMinute = true;
            this.invalidTime = true;
        }
        else {
            this.invalidMinute = false;
            this.invalidTime = false;
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