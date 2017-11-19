import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string): Observable<boolean> {
        const urlPost = 'http://city-surfingapi.azurewebsites.net/api/Users/Login';
        return this.http.post(urlPost, {Username : username , Password: password})
            .map((response: Response) => {
                if (response.status === 200) {
                    const responseText = response.text();
                    localStorage.setItem('currentUser', JSON.stringify(JSON.parse(responseText)));
                    return true;
                } else {
                    return false;
                }
         }).catch((err: Response) => {
             return Observable.of(false);
         });
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }
}
