import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { AppConfig } from './app.config'

@Injectable()
export class RestService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  login(phone: string, password: string): Observable<any> {
    return this.http.get(this.config.ServiceURI + `users/login?phone=${phone}&password=${password}`);
  }

  getSurvey(): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveys/search`, { 'eqs': { category: 'CAPABILITY_ASSESSMENT' } });
  }

  updateSurvey(survey): Observable<any> {
    return this.http.put(this.config.ServiceURI + `surveys/${survey._id}`, survey);
  }

  getSurveyRecord(targetId): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveyRecords/search`, { 'eqs': { 'target._id': targetId } });
  }

  saveSurveyRecord(surveyRecord): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveyRecords`, surveyRecord);
  }
}
