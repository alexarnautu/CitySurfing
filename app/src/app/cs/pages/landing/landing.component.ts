import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-landing-component',
    templateUrl: './landing.component.html',
    styles: [`
    .btn-xlarge {
        padding: 18px 40px 45px;
        margin: 20px;
        font-size: 22px;
        line-height: normal;
        -webkit-border-radius: 8px;
           -moz-border-radius: 8px;
                border-radius: 8px;
        }`,
    `.big-text {
        font-size: 20px;
    }`],
})
export class LandingComponent {
}
