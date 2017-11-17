/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../@core/data/authentification.service';

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

  errors: boolean = false;
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(protected router: Router , protected authentificationService: AuthenticationService) {
    this.errors = false;
  }
  loginPress(): void {
    this.authentificationService.login(this.userEmail, this.userPassword).subscribe(
      response =>{
        if (response === true) {
          this.errors = false;
            this.router.navigate(['/']);
        } else {
            this.errors = true;
        }
    });
  }
}

