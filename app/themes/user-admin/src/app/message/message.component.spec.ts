import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModule } from 'ng2-bootstrap';
import { MessageComponent } from './message.component';
import { MessageService } from '../shared/message.service';

import {Router, ActivatedRoute, ROUTER_PROVIDERS} from "@angular/router";


describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      schemas:  [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        MessageService,
        {
            provide: Router, 
            useClass: class { navigate = jasmine.createSpy("navigate"); } 
        }
      ],
      imports: [
        AlertModule.forRoot()
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
