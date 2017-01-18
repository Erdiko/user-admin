/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {
    RouterTestingModule
} from '@angular/router/testing';

import { HeaderComponent }      from './header/header.component';
import { RouterOutlet } from "@angular/router";

import { AuthService }          from './shared/auth.service';
import { UsersService }         from './shared/users.service';
import { UserResolve }          from './shared/user-resolve.service';

import { HttpModule }           from '@angular/http';
import { Router, ActivatedRoute }   from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          AppComponent,
          HeaderComponent,
          RouterOutlet
      ],
      imports: [
        HttpModule
      ]
      providers: [
          AuthService,
          UsersService,
          UserResolve,
          ActivatedRoute
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
