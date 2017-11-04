import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


import { BaseComponent } from './cs/pages/base.component';
import { LoginComponent } from './pages/authentication/login/login.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  }, {
    path: 'index',
    loadChildren: './cs/pages/base.module#BaseModule' ,
  }, {
    path: 'login',
    component: LoginComponent,
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
