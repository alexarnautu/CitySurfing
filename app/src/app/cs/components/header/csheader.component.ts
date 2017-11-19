import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

@Component({
  selector: 'cs-header',
  styleUrls: ['./csheader.component.scss'],
  templateUrl: './csheader.component.html',
})
export class CsHeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: any;

  autentificat: boolean;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService, private userService: UserService, private analyticsService: AnalyticsService) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.autentificat = true;
    }
    else {
      this.autentificat = false;
    }
  }

  getAutentificat(): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.autentificat = true;
    }
    else {
      this.autentificat = false;
    }
    return this.autentificat;
  }

  logOutUser() {
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
