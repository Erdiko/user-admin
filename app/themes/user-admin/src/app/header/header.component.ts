import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { AuthService }          from "../shared/auth.service";
import { MessageService }   from '../shared/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        ) { 
    }

    ngOnInit() { }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    clickLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
