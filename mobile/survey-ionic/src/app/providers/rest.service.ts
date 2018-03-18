import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { AppConfig } from '../app.config'
import { AuthService } from '../providers/common.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!req.headers.has('Authorization')) {
    //   // Get the auth header from the service.
    //   const token = this.authService.getAuthorizationToken();
    //   // Clone the request to add the new header.
    //   const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token.access_token}`) });
    //   // Pass on the cloned request instead of the original request.
    //   return next.handle(authReq);
    // } else {
    //   return next.handle(req);
    // }
    return next.handle(req);
  }
}


@Injectable()
export class RestService {
  httpOptions = {}
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

  //上传图片
  postFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.config.ServiceURI}file/upload`, formData);
  }

  //题目相关 start
  getSurvey(): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveys/search`, { 'eqs': { category: 'CAPABILITY_ASSESSMENT' } });
  }

  updateSurvey(survey): Observable<any> {
    return this.http.put(this.config.ServiceURI + `surveys/${survey._id}`, survey);
  }
  //题目相关 end

  //答题记录相关 start
  getSurveyRecord(targetId): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveyRecords/search`, { 'eqs': { 'target._id': targetId } });
  }

  saveSurveyRecord(surveyRecord): Observable<any> {
    return this.http.post(this.config.ServiceURI + `surveyRecords`, surveyRecord);
  }
  //答题记录相关 end
}
