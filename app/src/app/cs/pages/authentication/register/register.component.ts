import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../../../@core/data/register.service';


@Component({
    selector: 'ngx-register',
    templateUrl: './register.component.html',
})

export class RegisterComponent {
    fullNameUser: string = '';
    emailUser: string = '';
    passwordUser: string = '';
    confirmPassword: string = '';
    phoneNumber: string = '';
    aboutUser: string = '';
    nullEmail: boolean;
    nullName: boolean;
    nullPassword: boolean;
    nullPhone: boolean;
    registerError: boolean;
    constructor(protected router: Router, protected registerService: RegisterService) {
        this.nullEmail = false;
        this.nullName = false;
        this.nullPassword = false;
        this.nullPhone = false;
        this.registerError = false;
    }

    register() {
        if (this.fullNameUser.length === 0) {
            this.nullName = true;
        }
        if (this.emailUser.length === 0) {
            this.nullEmail = true;
        }
        if (this.passwordUser.length === 0) {
            this.nullPassword = true;
        }
        if (this.phoneNumber.length === 0) {
            this.nullPhone = true;
        }
        if (this.aboutUser.length === 0) {
            this.aboutUser = 'No details about this user!';
        }
        this.registerService.register(this.emailUser, this.fullNameUser, this.phoneNumber,
            this.passwordUser, this.aboutUser).subscribe(
            response => {
                if (response === true) {
                    localStorage.setItem('userRemember', JSON.stringify(this.emailUser));
                    localStorage.setItem('passwordRemember', JSON.stringify(this.passwordUser));
                    this.router.navigate(['index/login']);
                    this.registerError = false;
                } else {
                    this.registerError = true;
                }
            });
    }

    emailChange(newValue): void {
        if (newValue.length > 0) {
            this.nullEmail = false;
        } else {
            this.nullEmail = true;
        }
    }

    nameChange(newValue): void {
        if (newValue.length > 0) {
            this.nullName = false;
        } else {
            this.nullName = true;
        }
    }

    passwordChange(newValue): void {
        if (newValue.length > 0) {
            this.nullPassword = false;
        } else {
            this.nullPassword = true;
        }
    }

    phoneChange(newValue): void {
        if (newValue.length > 0) {
            this.nullPhone = false;
        } else {
            this.nullPhone = true;
        }
    }

}
