/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpModule }               from '@angular/http';

import { AppComponent }         from './app.component';
import { HeaderComponent }      from './header/header.component';
import { AuthService }          from './shared/auth.service';
import { UsersService }         from './shared/users.service';
import { UserResolve }          from './shared/user-resolve.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          AppComponent,
          HeaderComponent
      ],
      imports: [
          HttpModule,
          RouterTestingModule
      ]
      providers: [
          AuthService,
          UsersService,
          UserResolve
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
