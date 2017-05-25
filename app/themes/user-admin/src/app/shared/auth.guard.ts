import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MessageService }      from './message.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private noAccess: string;

    constructor(private router: Router, public messageService: MessageService) {
    }

    canActivate() {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        //TODO add flash message!
        this.router.navigate(['/login']);
        let noAccess = "You need to login to gain access";
        this.messageService.sendMessage(noAccess, "no-access");
        return false;
    }

}
