import { NgModule } from '@angular/core';

import { CitysurfingComponent } from './citysurfing.component';
import { CitysurfingRoutingModule } from './citysurfing-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const CITYSURFING_COMPONENTS = [
  CitysurfingComponent,
];

@NgModule({
  imports: [
    CitysurfingRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...CITYSURFING_COMPONENTS,
  ],
  exports: [
    CitysurfingComponent
  ]
})
export class CitysurfingModule {
}
