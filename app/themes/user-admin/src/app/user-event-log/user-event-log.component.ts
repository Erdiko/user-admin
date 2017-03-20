import { Component, OnInit } from '@angular/core';

import { UsersService }   from '../shared/users.service';
import { Event } from '../shared/models/event.model';

import { ActivatedRoute } from '@angular/router';

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
  private wait: boolean;

  //initialize the subscription
  private events$: Subscription;
  public events: Event[];

  //Parameters of getUsersEvents()
  public userID: string;
  public pageSize = 10;
  public currentPage = 1;
  public sortCol = 'id';
  public sortDir = 'desc';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { 

    // subscribe to the service to get data
    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

    this.usersService.events$.subscribe(
      () => this.wait = false
    )
    
  }

  private _getEvents() {
    
    // this.wait = true is required in this specific location.
    this.wait = true;
    this.usersService.getUsersEvents(this.userID, 
                                    this.pageSize, 
                                    this.currentPage, 
                                    this.sortCol,
                                    this.sortDir);
    
  }

  sort(col) {

    // toggle sort dir if the user clicks on currently sorted column
    if(this.sortCol == col) {
        this.sortDir = (this.sortDir == "desc") ? "asc" : "desc";
    } else {
        // else default the sort to asc
        this.sortDir = "asc";
    }
    this.sortCol = col;

    this._getEvents();
  }
  
  ngOnInit() {  

    this.route.data.forEach((data: { user: any }) => {
        if(undefined !== data.user && data.user) {
            this.userID = data.user.id;
        }
    });

    this._getEvents();
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
  }

}
