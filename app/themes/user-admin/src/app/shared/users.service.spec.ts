/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {
    async,
    getTestBed,
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
import { UsersService } from './users.service';

describe('UsersService', () => {

    let backend: MockBackend;
    let authService: AuthService;
    let service: UsersService;

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
                },
                UsersService,
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

        const testbed   = getTestBed();
        backend         = testbed.get(MockBackend);
        authService     = testbed.get(AuthService);
        service         = testbed.get(UsersService);

        // set up some partials
        form = {
            "email":    "bar@example.com",
            "password": "asdf1234"
        };

        bodyData = {
                        "method":"list",
                        "success":true,
                        "users":{
                            "users": [
                                {"id":2,"email":"foo@mail.com","role":{"id":2,"name":"admin"},"name":"Foo","last_login":"2017-03-03 11:51:45","joined":"2016-10-20 18:09:05"},
                                {"id":1,"email":"bar@example.com","role":{"id":1,"name":"anonymous"},"name":"beef","last_login":"2017-03-01 21:31:14","joined":"2016-10-20 18:08:53"}
                            ],
                            "total": 2
                        },
                        "error_code": 0,
                        "error_message": ""
                    };

    }));

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {

            console.log(connection.request.url);

            switch(connection.request.url) {
                case "http://docker.local:8088/ajax/erdiko/users/admin/list":
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                break;
            }

        });
    }

    /*
    it('#getUsers should return an observable list of users', () => {

        let bodyData = bodyData;
        console.log(bodyData);
        bodyData.success = false;
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 500
        });

        service.getUsers();

        service.users$.subscribe(
            users$ =>  console.log(users$)
        );
    });

    it('#getUsers should return an observable list of users', () => {

        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        service.getUsers();

        service.users$.subscribe(
            users$ =>  expect(users$).toBeTruthy()
        );
    });
    */

});
