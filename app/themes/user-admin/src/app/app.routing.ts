import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }        from './home/home.component';
import { UserListComponent }    from './user-list/user-list.component';
import { UserEditComponent }    from './user-edit/user-edit.component';

import { UserResolve }          from './shared/user-resolve.service';

// clang-format off
const appRoutes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'list',
        component: UserListComponent
    },
    {
        path: 'user',
        component: UserEditComponent
    },
    {
        path: 'user/:id',
        component: UserEditComponent,
        resolve: {
            user: UserResolve
        }
    },
    {
        path: '**',
        component: HomeComponent
    }
];
// clang-format on

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: false}
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class AppRoutingModule {}
