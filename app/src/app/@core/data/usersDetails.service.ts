import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../cs/models/user';

@Injectable()
export class UsersDetailsService {
    constructor(private http: HttpClient) {
    }

    getUsersDetails(userId: String): Observable<User> {
        const urlPost = 'http://city-surfing.servehttp.com:54278/api/Users/' + userId;
        return this.http.get<User>(urlPost);
    }
}
