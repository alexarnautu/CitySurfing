import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { UsersDetailsService } from '../../../@core/data/usersDetails.service';
import { StyleService } from '../../services/style.service';

import { User } from '../../models/user';

@Component({
    selector: 'ngx-userDetails',
    templateUrl: './userDetails.component.html',
})

export class UserDetailComponent {
    private id: String;
    private sub: any;
    private userDetailText: any;
    private user: User;
    private reviews= 
        [
            {
                "UserID": "Alex",
                "text": "Este foarte bun si cumsecade."
            },
            {
                "UserID": "Arni",
                "text": "A facut o treaba minunata." 
            },
            {
                "UserID": "Calin",
                "text": "Nu-si face deloc treaba. Nu recomand!"
            }
        ]
    

    constructor(private route: ActivatedRoute, private userDetail: UsersDetailsService, private styleService: StyleService) {
        this.user = new User;
        styleService.setStyle('no_background');
    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Email;
      }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.id = params['id'];
           this.userDetail.getUsersDetails().subscribe (
                userDet => {
                    userDet.forEach(element => {
                        if (element.Id === this.id) {
                            this.user = element;
                        }
                    });
                }
               
            );
        });
        
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
