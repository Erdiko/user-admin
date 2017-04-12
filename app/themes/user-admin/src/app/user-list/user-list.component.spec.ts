/* tslint:disable:no-unused-variable */
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

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {Router, ActivatedRoute, ROUTER_PROVIDERS} from "@angular/router";

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { AlertModule, 
         ModalModule }          from 'ng2-bootstrap';

import { AuthService }          from '../shared/auth.service';
import { UsersService }         from '../shared/users.service';
import { MessageService }       from '../shared/message.service';
import { User }                 from "../shared/models/user.model";

import { UserListComponent }    from './user-list.component';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let backend: MockBackend;
    let usersService: UsersService;
    let router: any;

    let bodyData: any;

    beforeEach(async(() => {
    
        TestBed.configureTestingModule({
            declarations: [
                UserListComponent
            ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [
                FormsModule,
                ReactiveFormsModule,

                AlertModule.forRoot(),
                ModalModule.forRoot()
            ],
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Router, 
                    useClass: class { navigate = jasmine.createSpy("navigate"); } 
                },
                { 
                    provide: ActivatedRoute, 
                    useValue: { 'data': [{}] } 
                },
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
                MessageService,
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
        })
        .compileComponents();

        const testbed = getTestBed();

        backend = testbed.get(MockBackend);
        usersService = testbed.get(UsersService);

        router = testbed.get(Router);

        bodyData = {
                    "method": "list",
                    "success": true,
                    "users": {
                        "users": [
                            {"id":191,"email":"don.draper@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Don Draper","last_login":"n\/a","joined":"2016-12-29 11:59:11"},
                            {"id":190,"email":"p.olson@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Peggy Olson","last_login":"n\/a","joined":"2016-12-29 11:58:25"},
                            {"id":189,"email":"p.cambell@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Pete Campbell","last_login":"n\/a","joined":"2016-12-29 11:57:44"},
                            {"id":181,"email":"r.sterling@scpartners.com","role":{"id":2,"name":"admin"},"name":"Roger Sterling","last_login":"n\/a","joined":"2016-12-22 17:52:31"},
                            {"id":179,"email":"chicken@example.com","role":{"id":2,"name":"admin"},"name":"Chicken","last_login":"n\/a","joined":"2016-12-22 17:52:06"},

                            {"id":194,"email":"don.draper@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Don Draper","last_login":"n\/a","joined":"2016-12-29 11:59:11"},
                            {"id":195,"email":"p.olson@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Peggy Olson","last_login":"n\/a","joined":"2016-12-29 11:58:25"},
                            {"id":196,"email":"p.cambell@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Pete Campbell","last_login":"n\/a","joined":"2016-12-29 11:57:44"},
                            {"id":197,"email":"r.sterling@scpartners.com","role":{"id":2,"name":"admin"},"name":"Roger Sterling","last_login":"n\/a","joined":"2016-12-22 17:52:31"},
                            {"id":198,"email":"chicken@example.com","role":{"id":2,"name":"admin"},"name":"Chicken","last_login":"n\/a","joined":"2016-12-22 17:52:06"},

                            {"id":198,"email":"don.draper@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Don Draper","last_login":"n\/a","joined":"2016-12-29 11:59:11"},
                            {"id":199,"email":"p.olson@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Peggy Olson","last_login":"n\/a","joined":"2016-12-29 11:58:25"},
                            {"id":200,"email":"p.cambell@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Pete Campbell","last_login":"n\/a","joined":"2016-12-29 11:57:44"},
                            {"id":201,"email":"r.sterling@scpartners.com","role":{"id":2,"name":"admin"},"name":"Roger Sterling","last_login":"n\/a","joined":"2016-12-22 17:52:31"},
                            {"id":202,"email":"chicken@example.com","role":{"id":2,"name":"admin"},"name":"Chicken","last_login":"n\/a","joined":"2016-12-22 17:52:06"},

                            {"id":203,"email":"don.draper@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Don Draper","last_login":"n\/a","joined":"2016-12-29 11:59:11"},
                            {"id":204,"email":"p.olson@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Peggy Olson","last_login":"n\/a","joined":"2016-12-29 11:58:25"},
                            {"id":205,"email":"p.cambell@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Pete Campbell","last_login":"n\/a","joined":"2016-12-29 11:57:44"},
                            {"id":206,"email":"r.sterling@scpartners.com","role":{"id":2,"name":"admin"},"name":"Roger Sterling","last_login":"n\/a","joined":"2016-12-22 17:52:31"},
                            {"id":207,"email":"chicken@example.com","role":{"id":2,"name":"admin"},"name":"Chicken","last_login":"n\/a","joined":"2016-12-22 17:52:06"}

                        ],
                        "total": 20
                    },
                    "error_code": 0,
                    "error_message": ""
                  };

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

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

            switch(url.slice(0, url.indexOf("?"))) {
                case "/ajax/erdiko/users/admin/list":

                    let qstring = url.slice(url.indexOf("?") + 1).split("&");
                    let query = _normalizeQString(qstring);

                    let body = options.body.body;

                    // match q string vars for sorting and paging (if provided)
                    if(body.direction) {
                        expect(query.direction).toEqual(body.direction);
                    }

                    if(body.sort) {
                        expect(query.sort).toEqual(body.sort);
                    }

                case "/ajax/erdiko/users/admin/delete":
                default:
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                break;
            }

        });
    }

    it('should create', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        component.ngOnInit();

        component.users = [];
        component.total = 0;

        // no users 
        expect(component).toBeTruthy();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        // do we have a table
        expect(compiled.querySelector('table')).toBeTruthy();
        expect(compiled.querySelectorAll('tr').length).toBe(2);

    });

    it('should display list of users', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        // do we see the expected page count
        expect(component.getPageCount()).toBe(2);  
    });

    it('should display empty list of users if error occurs', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        bodyData.success = false;

        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 500
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        expect(compiled.querySelectorAll('tr').length).toBe(2);

        // do we see the expected page count
        expect(component.getPageCount()).toBe(0);  

        expect(compiled.querySelector('.alert.alert-warning')).toBeTruthy();
    });

    it('should show a new page when clicking a pagination button', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        bodyData.users.users = bodyData.users.users.slice(10);

        // "click" the page button
        component.clickPage(2);
        
        fixture.detectChanges();

        expect(compiled.querySelectorAll('tr').length).toBe(11);
    });

    it('should show a new page when clicking next button', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        bodyData.users.users = bodyData.users.users.slice(10);

        // "click" the page button
        component.clickNext();
        
        fixture.detectChanges();

        expect(compiled.querySelectorAll('tr').length).toBe(11);
    });

    it('should show a new page when clicking prev button', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        bodyData.users.users = bodyData.users.users.slice(10);

        // "click" the page button
        component.clickPrev();
        
        fixture.detectChanges();

        expect(compiled.querySelectorAll('tr').length).toBe(11);
    });

    it('should display list of users after clicking sort', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        bodyData.users.users    = bodyData.users.users.slice(9);

        // verify component sort params are set
        expect(component.sortCol).toBe('id');
        expect(component.sortDir).toBe('desc');

        expect(component.wait).toBeFalsy();

        // "click" the sort button

        bodyData.sort           = "id";
        bodyData.direction      = "asc";

        component.sort('id');

        fixture.detectChanges();

        expect(component.wait).toBeFalsy();

        // verify component sort params are set
        expect(component.sortCol).toBe('id');
        expect(component.sortDir).toBe('asc');

        expect(compiled.querySelectorAll('tr').length).toBe(12);

        // we click sort, again, and make sure sort dir is updated as we expect

        bodyData.sort           = "id";
        bodyData.direction      = "desc";

        component.sort('id');

        fixture.detectChanges();

        // verify component sort params are set
        expect(component.sortCol).toBe('id');
        expect(component.sortDir).toBe('desc');

    });

    it('should display warning if error occurs after clicking sort', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        fixture.detectChanges();

        // do we have a table with users?
        fixture.detectChanges();
        expect(compiled.querySelectorAll('tr').length).toBe(21);

        // verify component sort params are set
        expect(component.sortCol).toBe('id');
        expect(component.sortDir).toBe('desc');

        expect(component.wait).toBeFalsy();

        bodyData.success = false;

        // "click" the sort button
        component.sort('id');

        fixture.detectChanges();

        // do we have a table with users?
        expect(compiled.querySelectorAll('tr').length).toBe(2);

        // do we see the expected page count
        expect(component.getPageCount()).toBe(0);  

        expect(compiled.querySelector('.alert.alert-warning')).toBeTruthy();

    });

    it('should show modal is click delete', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        expect(component.confirmDeleteModal.isShown).toBeFalsy();

        component.clickDelete(1);

        fixture.detectChanges();
        expect(component.confirmDeleteModal.isShown).toBeTruthy();

    });

    it('should close modal if click cancel delete', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        // create new user button
        expect(compiled.querySelector('.btn-info')).toBeTruthy();

        expect(component.confirmDeleteModal.isShown).toBeFalsy();

        component.clickDelete(1);

        fixture.detectChanges();
        expect(component.confirmDeleteModal.isShown).toBeTruthy();

        component.cancelDelete();

        fixture.detectChanges();
        expect(component.confirmDeleteModal.isShown).toBeFalsy();
    });

    it('should make ajax request if confirm delete', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        component.ngOnInit();

        component.clickDelete(1);

        fixture.detectChanges();
        expect(component.confirmDeleteModal.isShown).toBeTruthy();

        component.confirmDelete(1);

        fixture.detectChanges();
        expect(component.confirmDeleteModal.isShown).toBeFalsy();
        expect(component.error).toBeFalsy();
    });

});
