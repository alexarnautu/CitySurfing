import { NgModule } from '@angular/core';

import { CsHeaderComponent } from './header/csheader.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Footer } from './footer/footer.component'

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    CsHeaderComponent,
    Footer,
  ],
  exports: [
    CsHeaderComponent,
    Footer,
  ],
})
export class ComponentsModule {
}
