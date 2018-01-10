/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { StyleService } from '../../../services/style.service';
import { AuthenticationService } from '../../../../@core/data/authentification.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})


export class LoginComponent {

  userEmail: string = '';
  userPassword: string = '';
  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  rememberMe: boolean;
  nullEmail: boolean = false;
  nullPassword: boolean = false;
  errors: boolean = false;
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(protected router: Router, protected authentificationService: AuthenticationService, private styleService: StyleService) {
    this.errors = false;
    this.nullPassword = false;
    this.nullEmail = false;
    styleService.setStyle('no_background');

    const rememberUser = JSON.parse(localStorage.getItem('userRemember'));
    if (rememberUser != null) {
      this.userEmail = JSON.parse(localStorage.getItem('userRemember'));
      this.userPassword = JSON.parse(localStorage.getItem('passwordRemember'));
      this.rememberMe = true;
    }
  }

  loginPress(): void {
    if (this.userPassword.length === 0) {
      this.nullPassword = true;
    }
    if (this.userEmail.length === 0) {
      this.nullEmail = true;
    }
    this.authentificationService.login(this.userEmail, this.userPassword).subscribe(
      response => {
        if (response === true) {
          if (this.rememberMe) {
            localStorage.setItem('userRemember', JSON.stringify(this.userEmail));
            localStorage.setItem('passwordRemember', JSON.stringify(this.userPassword));
          } else {
            localStorage.removeItem('userRemember');
            localStorage.removeItem('passwordRemember');
          }
          this.errors = false;
          this.router.navigate(['/']);
        } else {
          this.errors = true;
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

  passwordChange(newValue): void {
    if (newValue.length > 0) {
      this.nullPassword = false;
    } else {
      this.nullPassword = true;
    }
  }

}

