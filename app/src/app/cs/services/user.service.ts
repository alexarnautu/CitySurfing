import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job';

@Injectable()
export class JobsService {
  private jobsUrl = 'http://city-surfingapi.azurewebsites.net/api/Jobs';

  constructor(
    private http: HttpClient,
  ) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl)
  }
}
