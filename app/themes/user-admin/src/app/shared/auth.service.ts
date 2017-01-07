import { Injectable }                                                   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';

import { Observable }                                                   from 'rxjs';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    private loginUrl     = "/ajax/users/authentication/login";
    private logoutUrl    = "/ajax/users/authentication/logout";

    private _baseUrl: string;

    public token: string;

    /**
     *
     *
     */
    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        // hack to help with local development
        this._baseUrl = "";
        if(window.location && "localhost" == window.location.hostname) {
            this._baseUrl = "http://docker.local:8088";
        }
    }

    /**
     *
     *
     */
    isLoggedIn() {
        return Boolean(localStorage.getItem('currentUser')); 
    }

    /**
     *
     *
     */
    login(form: any): Observable<boolean> {
        let body = JSON.stringify(form);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._baseUrl + this.loginUrl;

        return this.http.post(url, body, options)
                   .map((response: Response) => {
                       // login successful if there's a jwt token in the response
                       let token = response.json() && response.json().body.token;
                       if (token) {
                           // set token property
                           this.token = token;

                           // store username and jwt token in local storage to keep user logged in between page refreshes
                           localStorage.setItem('currentUser', JSON.stringify({ token: token }));

                           // return true to indicate successful login
                           return true;
                       } else {
                           // return false to indicate failed login
                           return false;
                       }
                   })
                   .catch(
                       (error:any) => Observable.throw(error.json().error || 'Server error')
                   );
    }

    /**
     *
     *
     */
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
