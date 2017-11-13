import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string): Observable<boolean> {

        var urlPost = "http://city-surfingapi.azurewebsites.net/api/Users/Login";

        return this.http.post(urlPost, {Username : username , Password: password})
            .map((response: Response) => {
                let responseStatus = response.status;
                if (responseStatus === 200) {

                    localStorage.setItem('currentUser', JSON.stringify({ username: username }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }


            });
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }
}