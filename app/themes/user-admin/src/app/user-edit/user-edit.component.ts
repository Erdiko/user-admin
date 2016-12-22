import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { UsersService }   from '../shared/users.service';
import { User }           from "../shared/models/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    private title: string;

    private userForm: FormGroup;

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
            name:  ['', [Validators.required, Validators.minLength(2)]],
            email: ['', Validators.required],
            role:  ['', Validators.required]
        });
    }

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        if(valid) {
            value.id = this.user.id;
            this.usersService.updateUser(value);
        }
    }

}
