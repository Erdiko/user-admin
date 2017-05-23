import { Component, OnInit, ViewChild }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Subscription } from "rxjs";

import { MessageService }   from '../shared/message.service';
import { UsersService }             from '../shared/users.service';
import { User }                     from "../shared/models/user.model";

import { AlertComponent,
         ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    @ViewChild('confirmDeleteModal') public confirmDeleteModal:ModalDirective;

    private wait: any;

    private users$: Subscription;
    private total$: Subscription;
    public users: User[];
    public total: number;

    public currentPage = 1;
    public pagesize = 10;
    public pages: number[] = [];

    public sortCol: string;
    public sortDir: string;

    public error: any;
    private selectedUser: any;
        
    constructor(
           private messageService: MessageService,
           private usersService: UsersService,
           private route: ActivatedRoute,
           private router: Router) { 

        // init the wait state (and indication animation) to 'off'
        this.wait = false;

        // default the sort col and direction
        this.sortCol = 'id';
        this.sortDir = 'desc';

        // subscribe to the service to get data
        this.users$ = this.usersService.users$.subscribe(
            users$ => this.users = users$
        );

        this.total$ = this.usersService.total$.subscribe(
            total$ => this.total = total$
        );

        // listen for the total when it gets updated, update more stuff
        this.usersService.total$.subscribe(
            () => this._listUpdated()
        );

        this.selectedUser = false;
    }

    // on init get a list of the users
    ngOnInit() {
        this._getUsers();
    }

    // unsub all the things
    ngOnDestroy() {
        this.users$.unsubscribe();
        this.total$.unsubscribe();
    }

    // update the user list by making another request to the users service
    private _getUsers() {
        this.wait = true;
        this.usersService.getUsers(this.pagesize, 
                                   this.currentPage, 
                                   this.sortCol, 
                                   this.sortDir);
    }

    // list has been updated; toggle wait state off and generate pagination links
    private _listUpdated() {
        this.wait = false;
        this._setPagination();
    }

    // return pagination links count
    getPageCount() {
        return Math.ceil(this.total / this.pagesize);
    }

    // create a list of pagination links
    private _setPagination() {
        this.pages = [];
        for(var i = 1; i <= this.getPageCount(); i++){
            this.pages.push(i);
        }
    }

    // pagination click listeners
    clickPage(idx) {
        this.currentPage = idx;
        this._getUsers();
    }

    clickNext() {
        this.currentPage++;
        this._getUsers();
    }

    clickPrev() {
        this.currentPage--;
        this._getUsers();
    }

    // sort click listeners
    sort(col) {

        // toggle sort dir if the user clicks on currently sorted column
        if(this.sortCol == col) {
            this.sortDir = (this.sortDir == "desc") ? "asc" : "desc";
        } else {
            // else default the sort to asc
            this.sortDir = "asc";
        }
        this.sortCol = col;

        this._getUsers();
    }

    clickDelete(idx) {
        this.selectedUser = idx;
        this.confirmDeleteModal.show();
    }

    cancelDelete() {
        this.confirmDeleteModal.hide();
    }

    confirmDelete(idx) {
        this.confirmDeleteModal.hide();
        this.wait = true;
        this.usersService.deleteUser(this.selectedUser)
            .then(res => {
                this.messageService.sendMessage("delete-user", "success");
                this._handleResponse(res);
            })
            .catch(error => this.error = error);
    }

    private _handleResponse(res) {
        this._getUsers();
        this.wait = false;
        
        if(false == res.success) {
            this.error = res.error_message;
        }

    }

}
