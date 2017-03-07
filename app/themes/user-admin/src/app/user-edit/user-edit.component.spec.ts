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

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {Router, ActivatedRoute, ROUTER_PROVIDERS} from "@angular/router";

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { AlertModule, 
         ModalModule }          from 'ng2-bootstrap';

import { AuthService }          from '../shared/auth.service';
import { UsersService }         from '../shared/users.service';
import { User }                 from "../shared/models/user.model";

import { UserEditComponent }        from './user-edit.component';
import { UserEventLogComponent }    from '../user-event-log/user-event-log.component';

describe('UserEditComponent', () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;

    let backend: MockBackend;
    let usersService: UsersService;
    let authService: AuthService;
    let router: any;

    let bodyData: any;

    let user: User;

    beforeEach(async(() => {

        // create a test user
        user = new User();
        user.id = 1; 
        user.email = "foo@example.com";
        user.role = {id: 1};
        user.name = "Foo Bar";
        user.last_login = "2016-01-01 23:59:59";
        user.created_at = "2016-01-01 20:59:59";

        TestBed.configureTestingModule({
            declarations: [
                UserEditComponent,
                UserEventLogComponent
            ],
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
        authService = testbed.get(AuthService);

        router = testbed.get(Router);

        bodyData = {
                    };

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
        
            switch(connection.request.url) {
                case "http://docker.local:8088/ajax/erdiko/users/admin/update":
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                break;
            }

        });
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display form', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        component.ngOnInit();

        // does the form show up
        expect(compiled.querySelector('form')).toBeTruthy();

    });

    it('should prevent submission with invalid input', () => {
        component.ngOnInit();

        component.userForm.controls['name'].setValue('');
        component.userForm.controls['email'].setValue('');

        expect(component.onSubmit(component.userForm)).toBeFalsy();
    });

    it('should display form with values', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        component.user = user;

        component.ngOnInit();

        // does the form have any values in it?
        let name = component.userForm.controls['name'].value;
        expect(name).toBeTruthy();
        expect(name).toEqual(user.name);

        let email = component.userForm.controls['email'].value;
        expect(email).toBeTruthy();
        expect(email).toEqual(user.email);

        let role = component.userForm.controls['role'].value;
        expect(role).toBeTruthy();
        expect(role).toEqual(user.role.id);
    });

    it('should show an error message if api throws an error', () => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // set up a faked api response
        setupConnections(backend, {
            body: {
                body: {
                    "method": "update",
                    "success": false,
                    "user": {"id":191,"email":"don.draper@scpartners.com","role":{"id":1,"name":"anonymous"},"name":"Don Draper","last_login":null,"gateway_customer_id":null},
                    "error_code": 42,
                    "error_message":    "Something went wrong.",
                    "errors":           ["Something went wrong."]
                }
            },
            status: 500
        });

        // init the component
        component.user = user;
        component.ngOnInit();

        component.onSubmit(component.userForm);
        expect(component.onSubmit(component.userForm)).toBeFalsy();

        //expect(component.error).toEqual("Something went wrong.");
    });

    /*
    it('should show an error message if api rejects the submission', () => {

        // set up a faked api response
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

        // init the component
        component.ngOnInit();

        // fill out the form & submit
        component.loginForm.controls['email'].setValue('foo@example.com');
        component.loginForm.controls['password'].setValue('123');
        component.onSubmit(component.loginForm);

        expect(component.onSubmit(component.loginForm)).toBeFalsy();
        
        expect(component.error).toEqual('Username or Password is invalid');
    });

    it('should allow submission with valid input', () => {

        // set up a faked api response
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        // init the component
        component.ngOnInit();

        // fill out the form & submit
        component.loginForm.controls['email'].setValue('foo@example.com');
        component.loginForm.controls['password'].setValue('123');
        component.onSubmit(component.loginForm);

        // make sure the user gets routed to home
        expect(router.navigate).toHaveBeenCalledWith(["/"]);

        // call service to make sure user is logged in
        expect(service.isLoggedIn()).toBeTruthy();
    });
    */

});
