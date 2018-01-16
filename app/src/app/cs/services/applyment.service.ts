import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job';
import { Applyment } from '../models/applyment'

@Injectable()
export class ApplymentsService {
  private applymentsUrl = 'http://192.168.0.103:54278/api/Applyments/';

  constructor(private http: HttpClient,
  ) { }

  getApplyments(userId): Observable<Applyment[]> {
    return this.http.get<Applyment[]>(this.applymentsUrl + userId)
  }

  getApplymentsByJob(jobId): Observable<Applyment[]> {
    return this.http.get<Applyment[]>(this.applymentsUrl + 'ByJobId/' + jobId);
  }

  approveApplyment(jobId, userId): Observable<Object> {
      return this.http.post(this.applymentsUrl + 'Approve/' + jobId + '/' + userId, {});
  }

  deleteApplyment(userId, jobId): Observable<Object> {
    return this.http.delete(this.applymentsUrl + userId + '/' + jobId);
  }
}
