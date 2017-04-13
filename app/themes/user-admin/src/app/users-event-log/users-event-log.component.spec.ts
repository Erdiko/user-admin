/* tslint:disable:no-unused-variable */
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

import { AlertModule } from 'ngx-bootstrap';

import { AuthService } from '../shared/auth.service';
import { MessageService } from '../shared/message.service';
import { UsersService } from '../shared/users.service';
import { Event } from '../shared/models/event.model';

import { UsersEventLogComponent } from './users-event-log.component';

describe('UsersEventLogComponent', () => {
  let component: UsersEventLogComponent;
  let fixture: ComponentFixture<UsersEventLogComponent>;

  let backend: MockBackend;
  let usersService: UsersService;
  let messageService: MessageService;
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
			  MessageService,
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
                "direction": "desc",
				"error_code": 0,
				"error_message": "",
				"logs": [
					{
						"created_at": "2017-03-02 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{methcolor: 'blue', breakbad: true}",
						"id": 3,
						"user_id": 192
					},
					{
						"created_at": "2017-03-03 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{cancer: true, medicalbill: 'alot']}",
						"id": 2,
						"user_id": 192
					},
					{
						"created_at": "2017-03-04 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{occupation: ['chemistry teacher','car washer']}",
						"id": 1,
						"user_id": 192
					},	
					{
						"created_at": "2017-03-02 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{methcolor: 'blue', breakbad: true}",
						"id": 3,
						"user_id": 192
					},
					{
						"created_at": "2017-03-03 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{cancer: true, medicalbill: 'alot']}",
						"id": 2,
						"user_id": 192
					},
					{
						"created_at": "2017-03-04 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{occupation: ['chemistry teacher','car washer']}",
						"id": 1,
						"user_id": 192
					},	
					{
						"created_at": "2017-03-02 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{methcolor: 'blue', breakbad: true}",
						"id": 3,
						"user_id": 192
					},
					{
						"created_at": "2017-03-03 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{cancer: true, medicalbill: 'alot']}",
						"id": 2,
						"user_id": 192
					},
					{
						"created_at": "2017-03-04 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{occupation: ['chemistry teacher','car washer']}",
						"id": 1,
						"user_id": 192
					},	
					{
						"created_at": "2017-03-02 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{methcolor: 'blue', breakbad: true}",
						"id": 3,
						"user_id": 192
					},
					{
						"created_at": "2017-03-03 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{cancer: true, medicalbill: 'alot']}",
						"id": 2,
						"user_id": 192
					},
					{
						"created_at": "2017-03-04 12:12:12", 
						"event": "backend-test-profile-create", 
						"event_data": "{occupation: ['chemistry teacher','car washer']}",
						"id": 1,
						"user_id": 192
					}	
				],
				"method": "geteventlogs",
				"page": 1,
				"page_size": 10,
				"total": 12,
				"sort": "created_at",
				"success": true,
				"user_id": null
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

			let url = connection.request.url; //http://docker.local:8088/ajax/erdiko/users/admin/eventlogs?
            let queryString = url.slice(url.indexOf("?"));

            url = url.slice(0, url.indexOf("?")).replace('http://docker.local:8088', '');
            switch(url) {
                case "/ajax/erdiko/users/admin/eventlogs":
					//Does ajax query string match with sortDir?
					expect(queryString).toEqual("?pagesize="+component.pageSize+"&page="+component.currentPage+"&sort="+component.sortCol+"&direction="+component.sortDir);

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
	expect(compiled.querySelectorAll('tr th').length).toBe(5);
	
	//Check for the names of the column headers.
    expect(compiled.querySelector('tr th:first-child').textContent).toContain("ID");
	expect(compiled.querySelector('tr th:nth-child(2)').textContent).toContain("User ID");
    expect(compiled.querySelector('tr th:nth-child(3)').textContent).toContain("Event Log");
    expect(compiled.querySelector('tr th:nth-child(4)').textContent).toContain("Event Data");
    expect(compiled.querySelector('tr th:last-child').textContent).toContain("Created At");
    
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

	expect(compiled.querySelector('i.fa.fa-refresh.fa-spin.fa-2x.fa-fw')).toBeFalsy();
	expect(compiled.querySelectorAll('tr.users-events').length).toBe(12);
	expect(compiled.querySelector('tr.users-events:first-child td:first-child').textContent).toContain("3");
	expect(compiled.querySelector('tr.users-events:last-child td:first-child').textContent).toContain("1");


  });

  it('should test for a sort function', () => {
	fixture.detectChanges();
	const compiled = fixture.debugElement.nativeElement;

	
	setupConnections(backend, {
		body: {
			body: bodyData
		},
		errors: false,
		status: 200
	});

	component.ngOnInit();

    //before the sort function is clicked
    expect(component.sortDir).toBe("desc");
	
    //sort function is clicked
    component.sort('id');

    //after the sort function is clicked
    expect(component.sortDir).toBe("asc");

	fixture.detectChanges();
	expect(compiled.querySelectorAll('tr.users-events').length).toBe(12);
  });

  it('should test for pagination', () => {
	fixture.detectChanges();
	const compiled = fixture.debugElement.nativeElement;

	setupConnections(backend, {
		body: {
			body: bodyData
		},
		errors: false,
		status: 200
	});

	component.ngOnInit();

	fixture.detectChanges();
	expect(compiled.querySelectorAll('tr.users-events').length).toBe(12);

	//with page size of 10 and 12 events, number of page should be 2
	expect(component.getPageCount()).toBe(2);

	//At first page, the 1st page should have class active
	expect(compiled.querySelector('ul.pagination > li:first-child.active')).toBeTruthy();
	
	//When clickNext() the 2 page should have class active
	component.clickNext();	
	fixture.detectChanges();

	expect(compiled.querySelector('ul.pagination > li:last-child.active')).toBeTruthy();

	//When clickPage(1) the 1 page should have class active
	component.clickPage(1);
	fixture.detectChanges();

	expect(compiled.querySelector('ul.pagination > li:first-child.active')).toBeTruthy();
	
	//When clickPage(2), the 2 page should have class active
	component.clickPage(2);
	fixture.detectChanges();

	expect(compiled.querySelector('ul.pagination > li:last-child.active')).toBeTruthy();
	
  })
});
