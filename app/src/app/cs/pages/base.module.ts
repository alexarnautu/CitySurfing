import { NgModule } from '@angular/core';
import { Routes, ExtraOptions, RouterModule} from '@angular/router';

import { BaseComponent } from './base.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from './../components/components.module';
import { ThemeModule } from '../../@theme/theme.module';
import { BaseRoutingModule } from './base-routing.module'
import { ListingComponent } from './listing/listing.component';
import { JobListingComponent } from '../components/job-listing/job-listing.component';


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
  ],
  exports: [
    BaseRoutingModule,
  ],
})
export class BaseModule {
}
