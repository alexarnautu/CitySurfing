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

    getUsersDetails(): Observable<User[]> {
        const urlPost = 'http://192.168.0.103:54278/api/Users';
        return this.http.get<User[]>(urlPost);
    }
}
