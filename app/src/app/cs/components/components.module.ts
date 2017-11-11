import { NgModule } from '@angular/core';

import { CsHeaderComponent } from './header/csheader.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    CsHeaderComponent,
  ],
  exports: [
    CsHeaderComponent,
  ],
})
export class ComponentsModule {
}
