import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserEventLogComponent } from './user-event-log.component';

describe('UserEventLogComponent Unit Test', () => {
  let component: UserEventLogComponent;
  let fixture: ComponentFixture<UserEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEventLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
              //createComponent creates an instance of the UserEventLogComponent  
    fixture = TestBed.createComponent(UserEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
