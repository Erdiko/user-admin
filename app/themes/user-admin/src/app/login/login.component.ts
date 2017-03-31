import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { AuthService }   from '../shared/auth.service';
import { MessageService }   from '../shared/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

    private wait: any;

    private title: string;

    private loginForm: FormGroup;

    public loggedOut: string;
    public error: string;

    constructor(
           private authService: AuthService,
           private router: Router,
           private fb: FormBuilder,
           private messageService: MessageService) { 

        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        
    }

    ngOnInit() {

        this._initForm();

    }

    private _initForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password:  ['', Validators.required]
        });

        //Display flash message when directed from logged-in state
        this.loggedOut = this.authService.loggedOut ? this.authService.loggedOut : null;
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {

        this.wait = true;

        this.error = '';

        if(valid) {

            this.authService.login(value)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/']);
                    } else {
                        this.sendMessage("login", "noPassword");
                        //this.error = 'Username or Password is invalid';
                        this.wait = false;
                    }
                }, err => {
                    this.sendMessage("login", "error");
                    //this.error = 'An error occurred. Please try again.';
                    this.wait = false;
                });

        }
    }

    sendMessage(action, method) {
        console.log("login");
        this.messageService.sendMessage(action, method);
    }

}
