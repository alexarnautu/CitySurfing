import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class CreateJobService {
    constructor(private http: Http) {
    }

    createJob(jobTitle: string, description: string, price: Number,
        location: string, userId: string): Observable<boolean> {
        const urlPost = 'http://192.168.0.103:54278/api/Jobs';
        return this.http.post(urlPost, {Title: jobTitle, Description: description, Price: +price,
            Location: location, Creator: {"Id": userId}, IsAvailable: true, Category: {
                "Id": 1,
                "Name": "Babysitting",
                "Description": "descripyion"
              }})
        .map((response: Response) => {
            if (response.status === 201) {
                return true;
            } else {
                return false;
            }
        }).catch((err: Response) => {
            return Observable.of(false);
        });
    }
}
