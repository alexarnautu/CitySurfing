import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { StyleService } from '../../services/style.service';

import { CreateJobService } from '../../../@core/data/createJob.service';

@Component({
    selector: 'ngx-createJob',
    templateUrl: './createJob.component.html',
})

export class CreateJobComponent {
    jobTitleInput: string = '';
    DescriptionInput: string = '';
    PriceInput: Number;
    LocationInput: string = '';
    nullTitle: boolean;
    nullDescription: boolean;
    nullPrice: boolean;
    nullLocation: boolean;
    createError: boolean;
    constructor(protected router: Router, protected createJobService: CreateJobService, private styleService: StyleService) {
        this.nullTitle = false;
        this.nullDescription = false;
        this.nullPrice = false;
        this.nullLocation = false;
        this.createError = false;
        styleService.setStyle('no_background');

    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).FullName;
      }

    createJob() {
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
        const user = this.getUserEmail();
        this.createJobService.createJob(this.jobTitleInput, this.DescriptionInput, this.PriceInput,
            this.LocationInput).subscribe(
            response => {
                if (response === true) {
                    this.router.navigate(['index/login']);
                    this.createError = false;
                } else {
                    this.createError = true;
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
