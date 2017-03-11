import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEventLogComponent } from './users-event-log.component';

describe('UsersEventLogComponent', () => {
  let component: UsersEventLogComponent;
  let fixture: ComponentFixture<UsersEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEventLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
