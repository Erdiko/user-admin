import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app.routing';

import { AuthService }          from './shared/auth.service';
import { UserResolve }          from './shared/user-resolve.service';

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';

import { HeaderComponent }      from './header/header.component';

import { AlertModule, 
         ModalModule,
         TabsModule }          from 'ngx-bootstrap';

import { UserAdminModule }      from '@erdiko/ng-user-admin';
import { UsersService }         from './shared/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,

    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),

    UserAdminModule.forRoot()
  ],
  providers: [
    AuthService,
    UserResolve,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
