import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApplymentsService {

  private jobsUrl = 'http://city-surfing.servehttp.com:54278/api/Applyments';
  
  constructor(
    private http: HttpClient,
  ) { }

  applyTo(jobId: number, proposal: string) {
    return this.http.post(this.jobsUrl, {
      UserId: JSON.parse(localStorage.getItem('currentUser')).Id,
      JobId: jobId,
      Proposal: proposal
    });
  }

}
