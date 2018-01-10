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
            console.log(jobTitle + description + price + location + typeof +price)
        const urlPost = 'http://city-surfingapi.azurewebsites.net/api/Jobs';
        return this.http.post(urlPost, {Title: jobTitle, Description: description, Price: +price,
            Location: location, IsAvailable: true, StartDate: "2018-01-07T17:15:51.111Z",
            EndDate: "2018-01-07T17:15:51.111Z", Created: "2018-01-07T17:15:51.111Z",
            Category: {Id: 2}})
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
