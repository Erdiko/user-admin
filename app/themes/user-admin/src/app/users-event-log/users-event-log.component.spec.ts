import {
	async, 
	ComponentFixture, 
	getTestBed,
	TestBed 
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { 
	DebugElement,
	NO_ERRORS_SCHEMA
} from '@angular/core';

import { 
	Router,
	ActivatedRoute
} from "@angular/router";

import { 
	BaseRequestOptions,
    Http,
	HttpModule,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import { 
	MockBackend, 
	MockConnection 
} from '@angular/http/testing';

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { AlertModule } from 'ng2-bootstrap';

import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { Event } from '../shared/models/event.model';

import { UsersEventLogComponent } from './users-event-log.component';

describe('UserEventLogComponent', () => {
  let component: UsersEventLogComponent;
  let fixture: ComponentFixture<UsersEventLogComponent>;

  let backend: MockBackend;
  let usersService: UsersService;
  let router: any;

  let bodyData: any;

  beforeEach(async(() => {

	  //Configures and initializes environment for unit testing and provides
	  //methods for creating components and services in unit tests
      TestBed.configureTestingModule({
          declarations: [ UsersEventLogComponent ],
		  schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
			  BaseRequestOptions, 
			  MockBackend, 
			  UsersService,
			  AuthService,
			  {
                  provide: Router, 
                  useClass: class { navigate = jasmine.createSpy("navigate"); } 
              },
			  {
				  provide: ActivatedRoute,
				  useValue: { 'data': [{}] }
			  },
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

			],
		  imports: [
			  HttpModule,
			  FormsModule,
			  ReactiveFormsModule,
			  AlertModule.forRoot()]
    })
    .compileComponents(); //Promise

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    router = testbed.get(Router);

	//find the type of data from the service and mimic it.
	bodyData = {
				"error_code": 0,
				"error_message": "",
				"logs": [
					{
						"created_at": "2017-03-02 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{methcolor: 'blue', breakbad: true}",
						"id": 3
					},
					{
						"created_at": "2017-03-03 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{cancer: true, medicalbill: 'alot']}",
						"id": 2
					},
					{
						"created_at": "2017-03-04 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{occupation: ['chemistry teacher','car washer']}",
						"id": 1
					}	
				],
				"method": "geteventlogs",
				"page": 0,
				"sort": "created_at",
				"success": true,
				"user_id": "192"
			};

  }));

  beforeEach(() => {
              //createComponent creates an instance of the UserEventLogComponent  
	  fixture = TestBed.createComponent(UsersEventLogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {

			let url = connection.request.url;
            url = url.slice(0, url.indexOf("?")).replace('http://docker.local:8088', '');
        
            switch(url) {
                case "/ajax/erdiko/users/admin/eventlogs":
				default:
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

  it('should create a table', () => {
	//triggers change detection cycle for the component
	fixture.detectChanges();

	//Native Element is associated with the root element of the component
	const compiled = fixture.debugElement.nativeElement;

	//Does the table exist?
	expect(compiled.querySelector('table')).toBeTruthy();

	//Checks the number of column
	expect(compiled.querySelectorAll('tr th').length).toBe(4);
	
	//Check for the names of the column headers.
    expect(compiled.querySelector('tr th:first-child').textContent).toContain("Created At");
    expect(compiled.querySelector('tr th:nth-child(2)').textContent).toContain("ID");
    expect(compiled.querySelector('tr th:nth-child(3)').textContent).toContain("Event Log");
    expect(compiled.querySelector('tr th:last-child').textContent).toContain("Event Data");
    
  });

  it('should show a loading animation', () => {
	
	fixture.detectChanges();
	const compiled = fixture.debugElement.nativeElement;

	expect(compiled.querySelector('i.fa.fa-refresh.fa-spin.fa-2x.fa-fw')).toBeTruthy();
  });

  it('should display alert element for no user events found', () => {
	
	fixture.detectChanges();
	const compiled = fixture.debugElement.nativeElement;

	bodyData.logs = [];

	setupConnections(backend, {
		body: {
			body: bodyData
		},
		errors: false,
		status: 200
	});

	component.ngOnInit();
	fixture.detectChanges();

	expect(compiled.querySelector('alert')).toBeTruthy();
	expect(compiled.querySelector('i.fa.fa-refresh.fa-spin.fa-2x.fa-fw')).toBeFalsy();
  });

  it('should display a list of events', () => {
	fixture.detectChanges();
	const compiled = fixture.debugElement.nativeElement;

	//execute setupConnections function
	setupConnections(backend, {
		body: {
			body: bodyData
		},
		errors: false,
		status: 200
	});

	component.ngOnInit();
	fixture.detectChanges();

	expect(compiled.querySelectorAll('tr.users-events').length).toBe(3);
	//expect(compiled.querySelector('tr.users-events:first-child td:first-child').textContent).toContain("3");
	//expect(compiled.querySelector('tr.users-events:last-child td:first-child').textContent).toContain("1");


  });

//   it('should test for a sort function', () => {
// 	fixture.detectChanges();
// 	const compiled = fixture.debugElement.nativeElement;

	
// 	setupConnections(backend, {
// 		body: {
// 			body: bodyData
// 		},
// 		errors: false,
// 		status: 200
// 	});

// 	component.ngOnInit();
// 	component.sortID();

// 	fixture.detectChanges();
// 	expect(compiled.querySelectorAll('tr.users-events').length).toBe(3);
//   });
});
