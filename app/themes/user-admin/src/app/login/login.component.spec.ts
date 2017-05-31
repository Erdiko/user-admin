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

import { Router, ROUTER_PROVIDERS } from "@angular/router";

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { AlertModule, 
         ModalModule }          from 'ngx-bootstrap';

import { AuthService }   from '../shared/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let backend: MockBackend;
    let service: AuthService;
    let router: any;

    let bodyData: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
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
        })
        .compileComponents();

        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(AuthService);
        router = testbed.get(Router);

        bodyData = {
                        "method":           "login",
                        "success":          true,
                        "error_code":       0,
                        "error_message":    "",
                        "token":            btoa("test string"),
                        "errors":           false
                    };

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === "http://docker.local:8088/ajax/users/authentication/login") {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display form', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('form')).toBeTruthy();
    });

    it('should prevent submission with invalid input', () => {
        component.ngOnInit();

        component.loginForm.controls['email'].setValue('foo@example.com');
        component.loginForm.controls['password'].setValue('');

        expect(component.onSubmit(component.loginForm)).toBeFalsy();
    });

    it('should show an error message if api throws an error', () => {
        const compiled = fixture.debugElement.nativeElement;

        // set up a faked api response
        setupConnections(backend, {
            body: {
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
    });

    it('should show an error message if api rejects the submission', () => {
        const compiled = fixture.debugElement.nativeElement;

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

});
