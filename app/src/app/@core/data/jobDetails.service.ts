import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Text } from '@angular/compiler';
import { Job } from '../../cs/models/job';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class JobDetailService {
    constructor(private http: HttpClient) {
    }

    getJobDetail(id: Number): Observable<Job> {
        var urlGet = 'http://city-surfing.servehttp.com:54278/api/Jobs/';
        urlGet = urlGet + id;
        return this.http.get<Job>(urlGet);
    }

    setJobUnavailable(id: Number): Observable<Object> {
        var urlPost = 'http://city-surfing.servehttp.com:54278/api/Jobs/SetUnavailable/' + id;
        return this.http.post<Object>(urlPost, {});
    }
}

