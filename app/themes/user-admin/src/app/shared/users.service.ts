import { Injectable }                                                   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';
import { BehaviorSubject }                                              from "rxjs";

import 'rxjs';

import { AuthService }  from "./auth.service";
import { User }         from "./models/user.model";

@Injectable()
export class UsersService {

    private _users$:       BehaviorSubject<any>;
    private _total$:       BehaviorSubject<any>;
    private _events$:      BehaviorSubject<any>;
    private _eventsTotal$: BehaviorSubject<any>;

    private dataStore: {users?: any, total?: number, events?: any, eventsTotal?: number};

    private listUrl         = "/ajax/erdiko/users/admin/list";
    private userUrl         = "/ajax/erdiko/users/admin/retrieve";
    private updateUrl       = "/ajax/erdiko/users/admin/update";
    private createUrl       = "/ajax/erdiko/users/admin/create";
    private deleteUrl       = "/ajax/erdiko/users/admin/delete";
    private changePassUrl   = "/ajax/erdiko/users/admin/changepass";

    private userEventUrl    = "/ajax/erdiko/users/admin/eventlogs";

    private authToken: any;

    private _baseUrl: string;

    constructor(
        private http: Http,
        private authService: AuthService) {

        this.dataStore = {};

        this._users$  =      new BehaviorSubject(null);
        this._total$  =      new BehaviorSubject(null);
        this._events$ =      new BehaviorSubject(null);
        this._eventsTotal$ = new BehaviorSubject(null);

        // hack to help with local development
        this._baseUrl = "";
        if(window.location && "localhost" == window.location.hostname) {
            this._baseUrl = "http://docker.local:8088";
        }

    }

    get users$() {
        return this._users$.asObservable();
    }

    get total$() {
        return this._total$.asObservable();
    }

    get events$() {
        return this._events$.asObservable();
    }

    get eventsTotal$() {
        return this._eventsTotal$.asObservable();
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
     * Get list of users based on sort, returns an observable
     *
     */
    getUsers(pagesize?: number, page?: number, sortCol?: string, sortDir?: string) {
        let url = this._baseUrl + this.listUrl;

        if(pagesize) {
            url += "?pagesize=" + pagesize;
        }

        if(page) {
            url += "&page=" + page;
        }

        if(sortCol) {
            url += "&sort=" + sortCol;
        }

        if(sortDir) {
            url += "&direction=" + sortDir;
        }
    
        let options = this._getHeaderOptions();

        return this.http.get(url, options)
                   .map(response => response.json())
                   .subscribe(data => {
                       this.dataStore.users = [];
                       this.dataStore.total = 0;
                       if(true == data.body.success) {
                           this.dataStore.users = data.body.users.users;
                           this.dataStore.total = data.body.users.total;
                       }
                       this._users$.next(this.dataStore.users);
                       this._total$.next(this.dataStore.total);
                   },
                   error => {
                       // log the error!
                       console.error("Error retrieving users!", url, error);
                       
                       this._users$.next([]);
                       this._total$.next(0);
                   });
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
     * Update a specific user
     *
     */
    updateUser(user) {
        let body = JSON.stringify(user);

        let options = this._getHeaderOptions();

        let url = this._baseUrl + this.updateUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);
    }

    /**
     * Create a new user
     *
     */
    createUser(user) {
        let body = JSON.stringify(user);
        let options = this._getHeaderOptions();

        let url = this._baseUrl + this.createUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => {
                       return response.json().body;
                    })
                   .catch(this.handleError);
    }

    /**
     * Delete a user record
     *
     */
    deleteUser(id: string) {
        let body = JSON.stringify({"id": id});
        let options = this._getHeaderOptions();

        let url = this._baseUrl + this.deleteUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);

    }

    /**
     * Update a user record password
     *
     */
    changePassword(id: number, newpass: string) {
        let body = JSON.stringify({'id': id, 'newpass': newpass});
        let options = this._getHeaderOptions();

        let url = this._baseUrl + this.changePassUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);
    }

    /**
     * get event logs for a user
     *
     */
    getUsersEvents(id?: string, pagesize?: number, page?: number, sortCol?: string, sortDir?: string) {

        let url = this._baseUrl + this.userEventUrl + "?";

        if(id){
            url += "user_id=" + id + "&";
        }

        if(pagesize) {
            url += "pagesize=" + pagesize + "&";
        }

        if(page) {
            url += "page=" + page + "&";
        }

        if(sortCol) {
            url += "sort=" + sortCol + "&";
        }

        if(sortDir) {
            url += "direction=" + sortDir;
        }

        let options = this._getHeaderOptions();

        return this.http.get(url, options)
                   .map(response => response.json())
                   .subscribe(data => {
                       this.dataStore.events = [];
                       this.dataStore.eventsTotal = 0;
                       if(true == data.body.success) {
                           
                           this.dataStore.events = data.body.logs;
                           this.dataStore.eventsTotal = data.body.total;
                       }
                       this._events$.next(this.dataStore.events);
                       this._eventsTotal$.next(this.dataStore.eventsTotal);
                   },
                   error => {
                       // log the error!
                       console.error("Error retrieving user event logs!", url, error);
                       this._events$.next([]);
                       this._events$.next(0);
                   });
    }


    /**
     * handle response errors
     *
     */
     private handleError(error: any) {
        return Promise.reject(error.message || error);
    }

}
