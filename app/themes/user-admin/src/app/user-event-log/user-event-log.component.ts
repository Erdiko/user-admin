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

  //initialize the subscription
  private events$: Subscription;
  private events: Event[];

  //All values of user_id in MySQL Database is set to 1
  private userID = '1';

  constructor(
    private usersService: UsersService
  ) { 

    // subscribe to the service to get data
    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

  }

  
  private _getEvents() {

    this.usersService.getUserEvents(this.userID);

  }


  ngOnInit() {

    //let events = this.usersService.getUserEvents("1");
    //console.log("service: ", events);

    this._getEvents();

  }

  ngOnDestroy() {

    this.events$.unsubscribe();

  }

}
