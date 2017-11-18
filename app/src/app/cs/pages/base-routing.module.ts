import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';

import { LoginComponent } from './authentication/login/login.component'

const routes: Routes = [{
      path: '',
      component: BaseComponent,
      children: [{
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },],
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
