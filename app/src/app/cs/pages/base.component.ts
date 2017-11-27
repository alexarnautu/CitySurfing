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
    customClass = "custom_background"
    constructor(private styleService: StyleService)
    {
        styleService.layoutStyle$.subscribe(
            newStyle => {
              this.customClass = newStyle;
            });
    }
}
