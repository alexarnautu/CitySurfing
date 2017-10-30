import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CitysurfingComponent } from './citysurfing.component';

const routes: Routes = [{
  path: '',
  component: CitysurfingComponent,
  children: [{
    path: 'home',
    component: CitysurfingComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitysurfingRoutingModule {
}
