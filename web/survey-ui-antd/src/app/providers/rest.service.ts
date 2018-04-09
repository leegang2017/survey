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
    if (!req.headers.has('Authorization')) {
      // Get the auth header from the service.
      const token = this.authService.getAuthorizationToken();
      // Clone the request to add the new header.
      const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token.access_token}`) });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
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

  //登录和人员相关 start
  token(phone: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic bXlfYXBwOm15X3NlY3JldA==' })
    };

    return this.http.post(this.config.ServiceURI + `oauth2/token`, `username=${phone}&password=${password}&grant_type=password`, httpOptions);
  }

  login(phone: string, password: string): Observable<any> {
    return this.http.get(this.config.ServiceURI + `auth/users/login?phone=${phone}&password=${password}`);
  }

  getUsers(searchParams = {}, pagin: any = {}): Observable<any> {
    return this.http.post(this.config.ServiceURI + `users/search?page=${pagin.page}&pageSize=${pagin.pageSize}`, searchParams);
  }

  getUserWithRoles(id): Observable<any> {
    return this.http.get(this.config.ServiceURI + `users/getUserWithRoles/${id}`, );
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.config.ServiceURI + `users/${id}`);
  }

  saveUser(user): Observable<any> {
    if (user._id) {
      return this.http.put(this.config.ServiceURI + `users/${user._id}`, user);
    } else {
      return this.http.post(this.config.ServiceURI + `users`, user);
    }
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

  //权限相关 start
  saveRoles(roles): Observable<any> {
    if (roles._id) {
      return this.http.put(this.config.ServiceURI + `roles/${roles._id}`, roles);
    } else {
      return this.http.post(this.config.ServiceURI + `roles`, roles);
    }
  }

  getRoles(searchParams = {}, pagin: any = {}): Observable<any> {
    return this.http.post(this.config.ServiceURI + `roles/search?page=${pagin.page}&pageSize=${pagin.pageSize}`, searchParams);
  }
  //权限相关 end
}
