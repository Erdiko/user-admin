import { Injectable }                                                   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';
import { BehaviorSubject }                                              from "rxjs";

import 'rxjs';

import { AuthService }  from "./auth.service";
import { User }         from "./models/user.model";

@Injectable()
export class UsersService {

    private userUrl         = "/ajax/erdiko/users/admin/retrieve";

    private authToken: any;

    private _baseUrl: string;

    constructor(
        private http: Http,
        private authService: AuthService) {

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
    private _getHeaderOptions() {
        // add authorization header with jwt token
        let headers = new Headers({ 
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + this.authService.token
                                });
        let options = new RequestOptions({ headers: headers });

        return options;
    }

    /**
     * Get a specific user, returns a promise
     *
     */
    getUser(id: string) {
        let url = this._baseUrl + this.userUrl + '?id=' + id;
        let options = this._getHeaderOptions();
        return this.http.get(url, options)
                   .toPromise()
                   .then(response => response.json().body.user as User)
                   .catch(this.handleError);
    }

    /**
     * handle response errors
     *
     */
     private handleError(error: any) {
        return Promise.reject(error.message || error);
    }

}
