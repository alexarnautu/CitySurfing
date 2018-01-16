import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { StyleService } from '../../services/style.service';

import { CreateJobService } from '../../../@core/data/createJob.service';

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
    constructor(protected router: Router, protected createJobService: CreateJobService, private styleService: StyleService) {
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
        this.createJobService.createJob(this.jobTitleInput, this.DescriptionInput, this.PriceInput,
            this.LocationInput).subscribe(
            response => {
                if (response === true) {
                    this.router.navigate(['index/login']);
                    this.createError = false;
                    this.loading = false;
                } else {
                    this.createError = true;
                    this.loading = false;
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

}
