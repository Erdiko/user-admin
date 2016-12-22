import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { UsersService }   from '../shared/users.service';
import { User }           from "../shared/models/user.model";

import {AlertComponent } from 'ng2-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    private title: string;

    private userForm: FormGroup;

    private error: string;
    private msg: string;

    private user: User;

    constructor(
           private usersService: UsersService,
           private route: ActivatedRoute,
           private router: Router,
           private fb: FormBuilder
        ) { 

        this.user = new User();
    }

    ngOnInit() {

        this._initForm();
        this.route.data.forEach((data: { user: any }) => {
            this.user = data.user;
            if(this.user) {
                this.userForm.controls['name'].setValue(this.user.name);
                this.userForm.controls['email'].setValue(this.user.email);
                this.userForm.controls['role'].setValue(this.user.role);
            }
        });

    }

    private _initForm() {
        this.userForm = this.fb.group({
            name:  ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required],
            role:  ['', Validators.required]
        });
    }

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        if(valid) {
            if(this.user) {
                value.id = this.user.id;
                this.usersService.updateUser(value)
                    .then(res => this._handleResponse(res))
                    .catch(error => this.error = error);
            } else {
                this.usersService.createUser(value)
                    .then(res => this._handleResponse(res))
                    .catch(error => this.error = error);
            }
        }
    }


    private _handleResponse(res) {
        console.log("handle response: " + res);
        if(true == res.success) {
            this.msg = "User record was successfully updated."
        } else {
            this._handleError(res.error_message);
        }
    }

    private _handleError(error) {
        this.error = error;
    }

}
