import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    private users = [

        {
            id: 1,
            name: "Foo Bar",
            role: "Admin",
            last_login: "2016/08/10",
            joined: "2016/08/09"
        },
        {
            id: 2,
            name: "Bar Baz",
            role: "Customer",
            last_login: "2016/08/10",
            joined: "2016/08/09"
        },
        {
            id: 3,
            name: "Dude McDude",
            role: "Customer",
            last_login: "2016/08/10",
            joined: "2016/08/09"
        }

    ];

    constructor() { 

    }

    ngOnInit() {

    }

    create() {
        console.log("create clicked");
    }

    sort(col) {
        console.log("sort: " + col);
    }

}
