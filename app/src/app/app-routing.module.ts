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


import { HomeComponent } from './user/home.component';
import { LoginComponent } from './pages/authentication/login/login.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  }, {
    path: 'index',
    component: HomeComponent,
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
