import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

@Component({
  selector: 'cs-footer',
  templateUrl: './footer.component.html',
})
export class Footer{


  @Input() position: string = 'normal';

  user: any;

  autentificat: boolean;
  url: string ="";
  userMenu = [];

  constructor(){}


  getAutentificat(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.autentificat = true;
    } else {
      this.autentificat = false;
    }
    return this.autentificat;
  }

}
