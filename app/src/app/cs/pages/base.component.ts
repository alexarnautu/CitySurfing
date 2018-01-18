import { Component, HostBinding } from '@angular/core';
import { StyleService } from "../services/style.service";

@Component({
    selector: 'cs-base-component',
    templateUrl: './base.component.html',
    styles: [
        `.custom_background { background : url(assets/images/Happiness.jpg) no-repeat center center fixed; }`
    ],
    providers: [
        StyleService
    ]
})
export class BaseComponent {
    autentificat: boolean;
    customClass = "custom_background"
    constructor(private styleService: StyleService)
    {
        styleService.layoutStyle$.subscribe(
            newStyle => {
              this.customClass = newStyle;
            });
    }
    getAutentificat(): boolean {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
          this.autentificat = true;
        } else {
          this.autentificat = false;
        }
        return this.autentificat;
      }
}


