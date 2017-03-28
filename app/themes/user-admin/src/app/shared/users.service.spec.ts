/* tslint:disable:no-unused-variable */

import {
    async,
    getTestBed,
    inject,
    TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import { User }         from "../shared/models/user.model";
import { AuthService }  from './auth.service';
import { UsersService } from './users.service';

describe('UsersService', () => {

    let backend: MockBackend;
    let authService: AuthService;
    let service: UsersService;

    let user: User;
    let userBodyData: any;
    let usersBodyData: any;

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

        // create a test user
        user = new User();
        user.id = 2; 
        user.email = "foo@mail.com";
        user.role = {id: 2, name: "admin"};
        user.name = "Foo";
        user.last_login = "2017-03-03 11:51:45";
        user.created_at = "2016-10-20 18:09:05";

        userBodyData = {
                "method": "retrieve",
                "success": true,
                "user": {
                    "id":2,
                    "email":"foo@mail.com",
                    "role":{"id":2,"name":"admin"},
                    "name":"Foo",
                    "last_login":"2017-03-03 11:51:45",
                    "created_at":"2016-10-20 18:09:05"
                }
        }

        usersBodyData = {
                        "method":"list",
                        "success":true,
                        "users":{
                            "users": [
                                {"id":2,"email":"foo@mail.com","role":{"id":2,"name":"admin"},"name":"Foo","last_login":"2017-03-03 11:51:45","created_at":"2016-10-20 18:09:05"},
                                {"id":1,"email":"bar@example.com","role":{"id":1,"name":"anonymous"},"name":"beef","last_login":"2017-03-01 21:31:14","created_at":"2016-10-20 18:08:53"}
                            ],
                            "total": 2
                        },
                        "error_code": 0,
                        "error_message": ""
                    };

    }));

    function _normalizeQString(qstring: string) {
        let query = {};
        for(let idx in qstring) {
            let pair = qstring[idx].split("=");
            query[pair[0]] = pair[1];
        }
        return query;
    }

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {

            let url = connection.request.url.replace('http://docker.local:8088', '');
            if(-1 !== (url.indexOf("?"))) {
                url = url.slice(0, url.indexOf("?"));
            }

            let body = options.body.body;
            let query = false;

            let fullUrl = connection.request.url.replace('http://docker.local:8088', '');
            if(-1 !== (fullUrl.indexOf("?"))) {
                let qstring = fullUrl.slice(fullUrl.indexOf("?") + 1).split("&");
                query = _normalizeQString(qstring);
            }

            switch(url) {
                case "/ajax/erdiko/users/admin/update":
                    expect(connection.request.method).toEqual(1);
                    expect(JSON.stringify(body.user)).toEqual(connection.request._body);
                break;
                case "/ajax/erdiko/users/admin/create":
                    expect(connection.request.method).toEqual(1);
                    expect(JSON.stringify(body.user)).toEqual(connection.request._body);
                break;
                case "/ajax/erdiko/users/admin/delete":
                    expect(connection.request.method).toEqual(1);
                    if(body.user && body.user.id) {
                        expect(body.user.id).toEqual(JSON.parse(connection.request._body).id);
                    }
                break;
                case "/ajax/erdiko/users/admin/changepass":
                    expect(connection.request.method).toEqual(1);

                    if(body.newpass) {
                        expect(JSON.parse(connection.request._body).newpass).toEqual(body.newpass);
                    }
                break;
                case "/ajax/erdiko/users/admin/list":
                    expect(connection.request.method).toEqual(0);
                    if(query) {
                        expect(query.pagesize).toBeTruthy();
                        expect(query.page).toBeTruthy();
                        expect(query.sort).toBeTruthy();
                        expect(query.direction).toBeTruthy();
                    }
                break;
                case "/ajax/erdiko/users/admin/retrieve":
                    expect(connection.request.method).toEqual(0);
                    expect(query.id).toBeTruthy();
                break;
            }

            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);

        });
    }

    it('#getUsers should return an empty observable list when the ajax request is unsuccessful', () => {

        usersBodyData.success = false;
        setupConnections(backend, {
            body: {
                body: usersBodyData
            },
            status: 500
        });

        service.users$.subscribe((res) => {
            if(res) {
                expect(res).toBeTruthy();
                expect(res.length).toEqual(0);
            }
        });

        service.total$.subscribe((res) => {
            if(res) {
                expect(res).toBeTruthy();
                expect(res).toEqual(0);
            }
        });

        let res = service.getUsers();

    });

    it('#getUsers should return an observable list of users and result total when the ajax request is successful', () => {
        usersBodyData.success = true;
        setupConnections(backend, {
            body: {
                body: usersBodyData
            },
            status: 200
        });

        service.users$.subscribe((res) => {
            if(res) {
                expect(res).toBeTruthy();
                expect(res.length).toEqual(2);
            }
        });

        service.total$.subscribe((res) => {
            if(res) {
                expect(res).toBeTruthy();
                expect(res).toEqual(2);
            }
        });

        let res = service.getUsers(42, 42, 'id', 'desc');

    });

    it('#getUser should return an empty user with an unsuccessful ajax response', () => {

        userBodyData.user = false;
        userBodyData.success = false;
        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 500
        });

        service.getUser(1).then(user => {
            expect(user).toBeFalsy();
        });

    });

    it('#getUser should return a promise with a user object with a successful ajax response', () => {

        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 200
        });

        service.getUser(1).then(user => {
            expect(user).toBeTruthy();
            expect(user.id).toEqual(userBodyData.user.id);
            expect(user.email).toEqual(userBodyData.user.email);
        });

    });

    it('#updateUser should reject unsuccessful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 500
        });

        service.updateUser(user)
               .catch(res => {

               });

    });

    it('#updateUser should return a user response on successful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 200
        });

        service.updateUser(user).then(user => {
            expect(user.user).toBeTruthy();
            expect(user.user.id).toEqual(userBodyData.user.id);
            expect(user.user.email).toEqual(userBodyData.user.email);
        });

    });

    it('#createUser should reject unsuccessful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 200
        });

        service.createUser(user)
               .catch(res => {

               });

    });

    it('#createUser should return a user response on successful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: userBodyData
            },
            status: 200
        });

        service.createUser(user).then(user => {
            expect(user.user).toBeTruthy();
            expect(user.user.id).toEqual(userBodyData.user.id);
            expect(user.user.email).toEqual(userBodyData.user.email);
        });

    });

    it('#deleteUser should reject an unsuccessful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: { }
            },
            status: 500
        });

        service.deleteUser(1)
               .catch(res => {

               });

    });

    it('#deleteUser should return a response from an successful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: { 
                    user: { id: 1 }
                }
            },
            status: 200
        });

        service.deleteUser(1).then(res => {
            expect(res.user.id).toEqual(1);
        });

    });

    it('#changePassword should reject an unsuccessful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: { }
            },
            status: 500
        });

        service.changePassword(1, 'foo')
               .catch(res => {

               });

    });

    it('#changePassword should return a response from an successful ajax request', () => {

        setupConnections(backend, {
            body: {
                body: { 
                        user: { id: 4 },
                        newpass: 'foo'
                    }
            },
            status: 200
        });

        service.changePassword(1, 'foo').then(res => {
            expect(res.user.id).toEqual(4);
        });

    });

    it('#getUsersEvents should return an empty observable list when the ajax request is unsuccessful', () => {

        usersBodyData.success = false;
        setupConnections(backend, {
            body: {
                body: usersBodyData
            },
            status: 500
        });

        service.events$.subscribe((res) => {
            if(res) {
                expect(res).toBeTruthy();
                expect(res.length).toEqual(0);
            }
        });

        let res = service.getUsersEvents();

    });

});
