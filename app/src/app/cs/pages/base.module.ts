import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from './../components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import { AuthenticationService } from '../../@core/data/authentification.service';
import { RegisterService } from '../../@core/data/register.service';

import { BaseRoutingModule } from './base-routing.module'
import { ListingComponent } from './listing/listing.component';
import { JobListingComponent } from '../components/job-listing/job-listing.component';

import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CreateApplymentComponent } from './create-applyment/create-applyment.component';

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    ThemeModule,
    ComponentsModule,
    BaseRoutingModule,
  ],
  declarations: [
    BaseComponent,
    LandingComponent,
    ListingComponent,
    JobListingComponent,
    LoginComponent,
    RegisterComponent,
    CreateApplymentComponent,
    DashboardComponent,
  ],
  exports: [
    BaseRoutingModule,
  ],
  providers: [
    AuthenticationService,
    RegisterService,
  ],
})
export class BaseModule {
}
