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

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';
import { UserListComponent }    from './user-list/user-list.component';
import { UserEditComponent }    from './user-edit/user-edit.component';
import { HeaderComponent }      from './header/header.component';

import { AlertModule, 
         ModalModule,
         TabsModule }          from 'ng2-bootstrap';

import { EqualityValidator }    from './shared/equality-validator.directive';
import { UserEventLogComponent } from './user-event-log/user-event-log.component';
import { UsersEventLogComponent } from './users-event-log/users-event-log.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    EqualityValidator,
    UserEventLogComponent,
    UsersEventLogComponent,
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
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    UsersService,
    UserResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
