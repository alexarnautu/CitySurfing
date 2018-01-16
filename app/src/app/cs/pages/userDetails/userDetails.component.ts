import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { UsersDetailsService } from '../../../@core/data/usersDetails.service';
import { ReviewService } from '../../../@core/data/review.service';
import { StyleService } from '../../services/style.service';

import { User } from '../../models/user';
import { Review } from '../../models/review';

@Component({
    selector: 'ngx-userDetails',
    templateUrl: './userDetails.component.html',
})

export class UserDetailComponent {
    private id: String;
    private sub: any;
    private userDetailText: any;
    private user: User;
    private reviewText: String='';
    private reviewError: boolean;
    private reviews: Review[];
    

    constructor(private route: ActivatedRoute, private reviewService: ReviewService, private userDetail: UsersDetailsService, private styleService: StyleService) {
        this.user = new User;
        this.reviewError = false;
        styleService.setStyle('no_background');
    }

    getUserEmail(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Email;
      }

      getUserId(): String {
        return JSON.parse(localStorage.getItem('currentUser')).Id;
      }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.id = params['id'];
           this.userDetail.getUsersDetails(this.id).subscribe (
                userDet => this.user = userDet
            );
            this.reviewService.getUsersReview(this.id.toString()).subscribe (
                rev => this.reviews = rev
            );
        });
    }

    onReviewSubmit() {
        var userFrom = this.getUserId();
        this.reviewService.postReview(userFrom.toString(), this.id.toString(), this.reviewText.toString()).subscribe(
            response => {
              if (response === true) {
                this.reviewError = false;
                window.location.reload();
              } else {
                this.reviewError = true;
              }
            });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
