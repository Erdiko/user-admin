/* tslint:disable:no-unused-variable */

import {
    async,
    getTestBed,
    inject,
    TestBed
} from '@angular/core/testing';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

    let backend: MockBackend;
    let service: AuthService;

    let form: any;
    let bodyData: any;
    let testToken: any;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                AuthService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });

        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(AuthService);

        // set up some partials
        form = {
            "email":    "bar@example.com",
            "password": "asdf1234"
        };

        bodyData = {
                        "method":           "login",
                        "success":          true,
                        "error_code":       0,
                        "error_message":    "",
                        "token":            btoa("test string"),
                        "errors":           false
                    };

        testToken = {"token": bodyData.token};

        localStorage.clear();
    }));

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === "http://docker.local:8088/ajax/users/authentication/login") {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }

    it('#login should return false on an unsuccessful request', () => {

        setupConnections(backend, {
            body: {
                body: {
                    "method":           "login",
                    "success":          false,
                    "error_code":       1,
                    "error_message":    "Something went wrong.",
                    "errors":           ["Something went wrong."]
                }
            },
            status: 500
        });

        service.login(form)
               .subscribe(result => {
                   // make sure this returns a false
                   expect(result).toBeFalsy();
               });
        
    });

    it('#login should return true and create a localStorage entry on a successful request', () => {

        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        service.login(form)
               .subscribe(result => {
                    // make sure this returned a true
                    expect(result).toBeTruthy();

                    // check local storage for current user
                    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
                    expect(currentUser).toEqual(testToken);
               });
        
    });

    it('#isLoggedIn should return false before login', () => {

       expect(service.isLoggedIn()).toBeFalsy();
        
    });

    it('#isLoggedIn should return true after login', () => {

        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        service.login(form)
               .subscribe(result => {
                    expect(result).toBeTruthy();
               });
        
       expect(service.isLoggedIn()).toBeTruthy();

    });

    it('#isLogout should delete localStorage', () => {

        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        service.login(form)
               .subscribe(result => {
                    expect(result).toBeTruthy();
               });
 
        service.logout();
       
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        expect(currentUser).toBeFalsy();
        expect(service.isLoggedIn()).toBeFalsy();

    });

});
