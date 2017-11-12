import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {Applyment} from 'app/cs/models/applyment';

@Injectable()
export class ApplymentsService {
  private applymentsUrl = 'http://citysurfing.azurewebsites.net/api/Applyments';

  constructor(private http: HttpClient) {
  }

  getApplyments(userId: string): Observable<Applyment[]> {
    const url = `${this.applymentsUrl}/${userId}`;
    return this.http.get<Applyment[]>(url);
  }
}
