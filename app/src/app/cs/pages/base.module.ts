import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';
import { LoadingModule } from 'ngx-loading';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from './../components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import { AuthenticationService } from '../../@core/data/authentification.service';
import { RegisterService } from '../../@core/data/register.service';
import { CreateJobService } from '../../@core/data/createJob.service';
import { JobDetailService } from '../../@core/data/jobDetails.service';
import { UsersDetailsService } from '../../@core/data/usersDetails.service';
import { ReviewService } from '../../@core/data/review.service';

import { BaseRoutingModule } from './base-routing.module';
import { ListingComponent } from './listing/listing.component';
import { JobListingComponent } from '../components/job-listing/job-listing.component';

import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './authentication/register/register.component';

import { CreateJobComponent } from './createJob/createJob.component';
import { JobDetailComponent } from './jobDetails/jobDetails.component';
import { UserDetailComponent } from './userDetails/userDetails.component';
import { CreateApplymentComponent } from './create-applyment/create-applyment.component';
import { SelectApplymentComponent } from 'app/cs/pages/select-applyment/selectApplyment';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { ToasterModule } from 'angular2-toaster';


const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    ThemeModule,
    ComponentsModule,
    BaseRoutingModule,
    LoadingModule,
    ToasterModule,
  ],
  declarations: [
    BaseComponent,
    LandingComponent,
    ListingComponent,
    JobListingComponent,
    LoginComponent,
    RegisterComponent,
    SelectApplymentComponent,

    CreateJobComponent,
    JobDetailComponent,
    UserDetailComponent,

    CreateApplymentComponent,
    DashboardComponent,

  ],
  exports: [
    BaseRoutingModule,
  ],
  providers: [
    AuthenticationService,
    RegisterService,
    CreateJobService,
    JobDetailService,
    UsersDetailsService,
    ReviewService,
    ToasterService,
  ],
})
export class BaseModule {
}
