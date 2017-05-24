import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app.routing';

import { AuthService }          from './shared/auth.service';
import { UsersService }         from './shared/users.service';
import { UserResolve }          from './shared/user-resolve.service';
import { MessageService }          from './shared/message.service';

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';

import { HeaderComponent }      from './header/header.component';

import { AlertModule, 
         ModalModule,
         TabsModule }          from 'ngx-bootstrap';

import { EqualityValidator }    from './shared/equality-validator.directive';
import { UsersEventLogComponent } from './users-event-log/users-event-log.component';
import { MessageComponent } from './message/message.component';
import { PasswordComponent } from './password/password.component';

import { UserAdminModule }      from '@erdiko/ngx-user-admin';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    EqualityValidator,
    UsersEventLogComponent,
    MessageComponent,
    PasswordComponent
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
    UsersService,
    UserResolve,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
