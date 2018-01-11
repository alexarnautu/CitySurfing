import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class CreateJobService {
    constructor(private http: Http) {
    }

    createJob(jobTitle: string, description: string, price: Number,
        location: string): Observable<boolean> {
        const urlPost = 'http://city-surfingapi.azurewebsites.net/api/Jobs';
        return this.http.post(urlPost, {Title: jobTitle, Description: description, Price: +price,
            Location: location, IsAvailable: true})
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
