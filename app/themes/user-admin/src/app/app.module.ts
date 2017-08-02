import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';

import { FormsModule, 
         ReactiveFormsModule }  from '@angular/forms';

import { RouterModule, Routes }     from '@angular/router';

import { HttpModule }           from '@angular/http';

import { AlertModule, 
         ModalModule,
         TabsModule }           from 'ngx-bootstrap';

import { UserAdminModule }      from '@erdiko/ngx-user-admin';

import { AppComponent }         from './app.component';

import { NotFoundComponent }    from './not-found/not-found.component';

import { AppRouting }           from './app.routing';

import { UserAdminRouting }      from '@erdiko/ngx-user-admin';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),

    UserAdminModule.forRoot(),

    UserAdminRouting,
    AppRouting
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
