import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job';
import { Applyment } from '../models/applyment'

@Injectable()
export class ApplymentsService {
  private applymentsUrl = 'http://192.168.0.103:54278/api/Applyments/';

  constructor(
    private http: HttpClient,
  ) { }

  getApplyments(userId): Observable<Applyment[]> {
    return this.http.get<Applyment[]>(this.applymentsUrl + userId)
  }

  deleteApplyment(userId, jobId): Observable<Object> {
    return this.http.delete(this.applymentsUrl + userId + '/' + jobId);
  }
}
