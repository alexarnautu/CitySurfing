import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class RegisterService {
    constructor(private http: Http) {
    }

    register(email: string, fullName: string, phoneNumber: string,
        password: string, about: string): Observable<boolean> {
        const urlPost = 'http://city-surfingapi.azurewebsites.net/api/Users';
        return this.http.post(urlPost, {Email: email, FullName: fullName, PhoneNumber: phoneNumber,
            Password: password, About: about, UserName: email})
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
}
