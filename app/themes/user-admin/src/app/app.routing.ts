import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';
import { UserListComponent }    from './user-list/user-list.component';
import { UserEditComponent }    from './user-edit/user-edit.component';
import { UsersEventLogComponent } from './users-event-log/users-event-log.component';

import { AuthGuard }            from './shared/auth.guard';

import { UserResolve }          from './shared/user-resolve.service';

// clang-format off
const appRoutes = [
    {
        path: 'list',
        canActivate: [
            AuthGuard
        ],
        component: UserListComponent
    },
    {
        path: 'events',
        canActivate: [
            AuthGuard
        ],
        component: UsersEventLogComponent
    },
    {
        path: 'user',
        canActivate: [
            AuthGuard
        ],
        component: UserEditComponent
    },
    {
        path: 'user/:id',
        component: UserEditComponent,
        canActivate: [
            AuthGuard
        ],
        resolve: {
            user: UserResolve
        }
    },
    {
        path: '',
        canActivate: [
            AuthGuard
        ],
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
// clang-format on

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ 
    AuthGuard
  ]
})
export class AppRoutingModule {}
