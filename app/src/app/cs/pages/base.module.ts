import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from './../components/components.module';
import { ThemeModule } from '../../@theme/theme.module';
import { BaseRoutingModule } from './base-routing.module'
const routes: Routes = [
  { path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  }, {
    path: 'index',
    component: LandingComponent,
  },
];

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
  ],
})
export class BaseModule {
}
