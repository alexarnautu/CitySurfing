import { Component, OnInit } from '@angular/core';
import { StyleService } from '../../services/style.service';

@Component({
    selector: 'cs-profile-component',
    templateUrl: './profile.component.html',
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
        font-size: 20px;`,
    ],
})
export class ProfileComponent {
    constructor(private styleService: StyleService) {
        styleService.setStyle('none');
    }
    getClass() {
        return "none";
    }
}
