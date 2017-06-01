import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';

import { AuthGuard }            from './shared/auth.guard';

import { UserResolve }          from './shared/user-resolve.service';

import { UserListComponent }        from '@erdiko/ng-user-admin';
import { UsersEventLogComponent }   from '@erdiko/ng-user-admin';
import { UserEditComponent }        from '@erdiko/ng-user-admin';

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
