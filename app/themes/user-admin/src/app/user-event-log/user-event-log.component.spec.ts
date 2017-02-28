import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventLogComponent } from './user-event-log.component';

describe('UserEventLogComponent', () => {
  let component: UserEventLogComponent;
  let fixture: ComponentFixture<UserEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEventLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
