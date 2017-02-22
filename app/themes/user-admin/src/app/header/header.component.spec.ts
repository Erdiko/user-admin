/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule }               from '@angular/http';
import { Router, ActivatedRoute }   from '@angular/router';

import { AuthService }     from '../shared/auth.service';
import { UsersService }    from '../shared/users.service';
import { UserResolve }     from '../shared/user-resolve.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          HeaderComponent 
      ],
      imports: [
        HttpModule
      ],
      providers: [
          AuthService,
          UsersService,
          UserResolve,
          ActivatedRoute
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
