import { Injectable }                                                   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject }                                              from "rxjs";

import { User } from "./models/user.model";

@Injectable()
export class UsersService {

    private _userData$: BehaviorSubject<User>;
    private dataStore: {userData: User};

    private listUrl = "http://docker.local/api/users/getusers";
    private userUrl = "http://docker.local/api/users/getuser";
    private updateUrl = "http://docker.local/api/users/update";

    constructor(private http: Http) {
        this._userData$ = new BehaviorSubject(null);
        this.dataStore = {userData: null};
    }

    get userData$() {
        return this._userData$.asObservable();
    }

    /**
     * Get list of users based on sort, returns an observable
     *
     */
    getUsers() {
        let url = this.listUrl;
        return this.http.get(url)
                   .map(response => response.json())
                   .subscribe(data => {
                       this.dataStore.userData = data.body.result;
                       this._userData$.next(this.dataStore.userData);
                   });
    }

    /**
     * Get a specific user, returns a promise
     *
     */
    getUser(id: string) {
        let url = this.userUrl + '?id=' + id;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json().body.user as User)
                   .catch(this.handleError);
    }

    /**
     *
     *
     */
    updateUser(user) {
        let body = JSON.stringify(user);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this.updateUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        return Promise.reject(error.message || error);
    }

}
