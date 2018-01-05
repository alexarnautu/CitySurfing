import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ListingComponent } from './listing/listing.component';

import { LoginComponent } from './authentication/login/login.component'
import { RegisterComponent } from './authentication/register/register.component'
import { CreateApplymentComponent } from 'app/cs/pages/create-applyment/create-applyment.component';

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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'create-applyment',
        component: CreateApplymentComponent
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }],
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
