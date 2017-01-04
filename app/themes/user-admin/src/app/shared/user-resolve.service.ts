import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

import { User }           from './models/user.model';
import { UsersService }   from './users.service';

@Injectable()
export class UserResolve implements Resolve<any> {

    constructor(
                private us: UsersService, 
                private router: Router
                ) {

    }

    resolve(route: ActivatedRouteSnapshot): Promise<User>|boolean {
        let id = route.params['id'];
        return this.us.getUser(id).then(user => {
            if (user) {
                return user;
            } else {
                this.router.navigate(['']);
                return false;
            }
        });
    }

}
