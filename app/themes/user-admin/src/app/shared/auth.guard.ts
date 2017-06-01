import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        //TODO add flash message!
        this.router.navigate(['/login']);
        //this.messageService.sendMessage("login", "no-access");
        return false;
    }

}
