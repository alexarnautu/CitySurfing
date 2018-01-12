import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from './../components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import { AuthenticationService } from '../../@core/data/authentification.service';
import { RegisterService } from '../../@core/data/register.service';
import { CreateJobService } from '../../@core/data/createJob.service';
import { JobDetailService } from '../../@core/data/jobDetails.service';
import { UsersDetailsService } from '../../@core/data/usersDetails.service';

import { BaseRoutingModule } from './base-routing.module';
import { ListingComponent } from './listing/listing.component';
import { JobListingComponent } from '../components/job-listing/job-listing.component';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CreateJobComponent } from './createJob/createJob.component';
import { JobDetailComponent } from './jobDetails/jobDetails.component';
import { UserDetailComponent } from './userDetails/userDetails.component';

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    ThemeModule,
    ComponentsModule,
    BaseRoutingModule
  ],
  declarations: [
    BaseComponent,
    LandingComponent,
    ListingComponent,
    JobListingComponent,
    LoginComponent,
    RegisterComponent,
    CreateJobComponent,
    JobDetailComponent,
    UserDetailComponent,
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
  ],
})
export class BaseModule {
}
