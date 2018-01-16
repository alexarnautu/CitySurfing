import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  url: string ="";
  userMenu = [];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.autentificat = true;
      this.url = "../#/index/userDetail/" + JSON.parse(localStorage.getItem('currentUser')).Id;
    } else {
      this.autentificat = false;
    }
  }

  goToDashboard() {
    this.router.navigate(['index/dashboard']);
  }
  getUserEmail(): String {
    return JSON.parse(localStorage.getItem('currentUser')).FullName;
  }

  getUserProfile() {
    this.router.navigate(['index/userDetail/' + JSON.parse(localStorage.getItem('currentUser')).Id]);
  }

  getAutentificat(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.autentificat = true;
    } else {
      this.autentificat = false;
    }
    return this.autentificat;
  }

  logOutUser() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['index/landing']);
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
    this.router.navigate(['index/landing']);
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
