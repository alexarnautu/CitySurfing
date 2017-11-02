import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {
}
