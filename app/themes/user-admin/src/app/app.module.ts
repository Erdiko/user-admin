import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';

import { HomeComponent }        from './home/home.component';
import { UserListComponent }    from './user-list/user-list.component';
import { UserEditComponent }    from './user-edit/user-edit.component';
import { HeaderComponent } from './header/header.component';

// clang-format off
const routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'list',
        component: UserListComponent
    },
    {
        path: 'user/:id',
        component: UserEditComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
// clang-format on

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: false}),
    BrowserModule,
    FormsModule,
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
