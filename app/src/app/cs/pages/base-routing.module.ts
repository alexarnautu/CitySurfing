import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ListingComponent } from './listing/listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './authentication/login/login.component'
import { RegisterComponent } from './authentication/register/register.component'
import { CreateJobComponent } from './createJob/createJob.component';
import { JobDetailComponent } from './jobDetails/jobDetails.component';
import { UserDetailComponent } from './userDetails/userDetails.component';
import { CreateApplymentComponent } from 'app/cs/pages/create-applyment/create-applyment.component';
import { SelectApplymentComponent } from 'app/cs/pages/select-applyment/selectApplyment';

const routes: Routes = [{
      path: '',
      component: BaseComponent,
      children: [{
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: 'listing',
        component: ListingComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'createJob',
        component: CreateJobComponent,
      },
      {
        path: 'jobDetail/:id',
        component: JobDetailComponent,
      },
      { 
        path: 'selectApplyment/:id',
        component: SelectApplymentComponent,  
      },
      {
        path: 'userDetail/:id',
        component: UserDetailComponent,
      },
      {
        path: 'create-applyment/:id',
        component: CreateApplymentComponent
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }]
    }];
const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class BaseRoutingModule {
}
