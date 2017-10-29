import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {
}
