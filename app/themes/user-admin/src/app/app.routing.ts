import { RouterModule, Routes }     from '@angular/router';

import { NotFoundComponent }        from './not-found/not-found.component';

// clang-format off
const appRoutes: Routes = [
    { path: '**', component: NotFoundComponent }
];
// clang-format on

export const AppRouting = RouterModule.forRoot(appRoutes, { 
    useHash: false
});
