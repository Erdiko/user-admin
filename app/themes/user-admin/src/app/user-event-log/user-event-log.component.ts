import { Component, OnInit } from '@angular/core';

import { UsersService }   from '../shared/users.service';
import { Event } from '../shared/models/event.model';

import { UserListComponent } from '../user-list/user-list.component';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-event-log',
  templateUrl: './user-event-log.component.html',
  styleUrls: ['./user-event-log.component.scss'],
  providers: [UsersService]
})
export class UserEventLogComponent implements OnInit {

  //Variable for the loading animation.
  private wait: any;

  //initialize the subscription
  private events$: Subscription;
  private events: Event[];

  //Parameters of getUserEvents()
  private userID = '1';
  private pageSize = null;
  private pageNumber = null;
  private sortCol = null;
  private sortDir = 'desc';

  constructor(
    private usersService: UsersService
  ) { 

    // subscribe to the service to get data
    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

  }

  private _getEvents() {

    //this.wait = true;
    this.usersService.getUserEvents(this.userID, 
                                    this.pageSize, 
                                    this.pageNumber, 
                                    this.sortCol,
                                    this.sortDir);

    //this.usersService.getUserEvents(this.userID);

  }

  sortID(){
    //console.log("ID was clicked. Sort function will be added later");
    this.sortDir = (this.sortDir === "desc") ? "asc" : "desc";

    this._getEvents();

  }
  
  


  ngOnInit() {

    this._getEvents();

  }

  ngOnDestroy() {

    this.events$.unsubscribe();

  }

}
