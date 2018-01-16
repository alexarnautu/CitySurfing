import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Text } from '@angular/compiler';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Review } from '../../cs/models/review';

@Injectable()
export class ReviewService {
    constructor(private http: Http, private httpClient: HttpClient) {
    }

    postReview(userFrom: string, userTo: string, text: string): Observable<boolean> {
        const urlPost = 'http://192.168.0.103:54278/api/Review';
        return this.http.post(urlPost, {Comment: text, UserFromId: userFrom, UserToId: userTo})
        .map((response: Response) => {
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        }).catch((err: Response) => {
            return Observable.of(false);
        });
    }

    getUsersReview(id: string): Observable<Review[]> {
        const urlPost = 'http://192.168.0.103:54278/api/Review/' + id;
        return this.httpClient.get<Review[]>(urlPost);
    }
}
