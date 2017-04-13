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
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import {Router, ActivatedRoute, ROUTER_PROVIDERS} from "@angular/router";

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { AlertModule, 
         ModalModule,
         TabsModule }          from 'ngx-bootstrap';

import { MessageService }   from '../shared/message.service';
import { AuthService }          from '../shared/auth.service';
import { UsersService }         from '../shared/users.service';
import { User }                 from "../shared/models/user.model";

import { UserEditComponent }        from './user-edit.component';
import { UserEventLogComponent }    from '../user-event-log/user-event-log.component';
import { PasswordComponent } from '../password/password.component';

describe('UserEditComponent', () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;

    let backend: MockBackend;
    let messageService: MessageService;
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
                UserEventLogComponent,
                PasswordComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,

                AlertModule.forRoot(),
                ModalModule.forRoot(),
                TabsModule.forRoot()
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
                },
                MessageService
            ],
            schemas:  [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        const testbed = getTestBed();

        backend = testbed.get(MockBackend);
        usersService = testbed.get(UsersService);
        authService = testbed.get(AuthService);

        router = testbed.get(Router);

        bodyData = {
                        "method": "update",
                        "success": true
                    };

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
         
            let url = connection.request.url.replace('http://docker.local:8088', '');

            switch(url.slice(0, url.indexOf("?"))) {

                case "/ajax/erdiko/users/admin/update":
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

    it('should recognize password input component', () => {
        fixture.detectChanges();
        expect(component.passwordComponent).toBeDefined();
    });

    it('should display forms', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // only the edit form should show up
        component.ngOnInit();
        expect(compiled.querySelector('form#user-edit')).toBeTruthy();
        expect(compiled.querySelector('form#user-password-change')).toBeFalsy();

        // both edit and password form should show up if a user is present
        component.user = user;
        component.ngOnInit();
        fixture.detectChanges();

        expect(compiled.querySelector('form#user-edit')).toBeTruthy();

        /**
         * Change: No need for toggle as the update password is already rendered
         */

        fixture.detectChanges();
        expect(compiled.querySelector('form#user-password-change')).toBeTruthy();
    });

    it('should prevent edit form submission with invalid input', () => {
        component.ngOnInit();

        component.userForm.controls['name'].setValue('');
        component.userForm.controls['email'].setValue('');

        expect(component.onSubmit(component.userForm)).toBeFalsy();
    });

    it('should display edit form with values', () => {
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

    it('should show an error message if api throws an error when attempting to update', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // set up a faked api response
        setupConnections(backend, {
            body: {
                body: {
                    "method": "update",
                    "success": false,
                    "user": {
                        "id":191,
                        "email":"don.draper@scpartners.com",
                        "role":{"id":1,"name":"anonymous"},
                        "name":"Don Draper",
                        "last_login":null,
                        "gateway_customer_id":null,
                    },
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

        fixture.detectChanges();
        component.userForm.controls.passwordInput.controls.password.setValue('abcdef123456');
        component.userForm.controls.passwordInput.controls.confirm.setValue('abcdef123456');
        component.onSubmit(component.userForm).then(() => {
            expect(component.error).toEqual("Something went wrong.");
        });

    }));

    it('should show an error message if api rejects the update submission', async(() => {

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
        component.userForm.controls['name'].setValue('foo bar');
        component.userForm.controls['email'].setValue('foo@example.com');
        component.userForm.controls['role'].setValue('1');
        component.userForm.controls.passwordInput.controls.password.setValue('abcdef123456');
        component.userForm.controls.passwordInput.controls.confirm.setValue('abcdef123456');
        component.onSubmit(component.userForm);

        fixture.detectChanges();
        component.onSubmit(component.userForm).then(() => {
            expect(component.error).toEqual("Something went wrong.");
        });

    }));

    it('should allow update submission with valid input', async(() => {

        fixture.detectChanges();

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
        component.userForm.controls['name'].setValue('foo bar');
        component.userForm.controls['email'].setValue('foo@example.com');
        component.userForm.controls['role'].setValue('1');
        component.userForm.controls.passwordInput.controls.password.setValue('abcdef123456');
        component.userForm.controls.passwordInput.controls.confirm.setValue('abcdef123456');

        fixture.detectChanges();
        component.onSubmit(component.userForm).then(() => {
            expect(component.msg).toEqual("User record was successfully updated.");
        });

    }));

    it('should prevent password form submission with invalid input', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        component.user = user;
        component.ngOnInit();

        /**
         * Change: No need for toggle as the update password is already rendered
         */
        component.passwordForm.controls.passwordInput.controls.password.setValue('');
        component.passwordForm.controls.passwordInput.controls.confirm.setValue('');
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();

        component.passwordForm.controls.passwordInput.controls.password.setValue('123');
        component.passwordForm.controls.passwordInput.controls.confirm.setValue('456');
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();

        component.passwordForm.controls.passwordInput.controls.password.setValue('----');
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();
    });

    it('should allow password update submission with valid input', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // set up a faked api response
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        // init the component
        component.ngOnInit();

        /**
         * Change: No need for toggle as the update password is already rendered
         */

        // fill out the form & submit
        component.passwordForm.controls.passwordInput.controls.password.setValue('abcdef123456');
        component.passwordForm.controls.passwordInput.controls.confirm.setValue('abcdef123456');

        fixture.detectChanges();

        expect(component.passwordForm.controls.passwordInput.invalid).toBeFalsy();
        component.onSubmitChangepass(component.passwordForm).then(() => {  
            expect(component.passMsg).toEqual("User password successfully updated.");
        });

    }))

});
