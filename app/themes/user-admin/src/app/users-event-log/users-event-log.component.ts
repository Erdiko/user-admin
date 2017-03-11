import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/models/event.model';
import { UsersService } from '../shared/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-event-log',
  templateUrl: './users-event-log.component.html',
  styleUrls: ['./users-event-log.component.scss'],
  providers: [UsersService]
})
export class UsersEventLogComponent implements OnInit {

  private wait: boolean;
  private events: Event[];
  
  private userID: string;
  private pageSize: number;
  private pageNumber: number;
  private sortCol: string;
  private sortDir: string;

  private events$: Subscription;

  constructor(
    private usersService: UsersService
  ) {
    this.userID = "";
    this.pageSize = null;
    this.pageNumber = null;
    this.sortCol = null;
    this.sortDir = 'desc';

    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

    this.usersService.events$.subscribe(
      () => this.wait = false
    )
  }

  private sortID(){
    this.sortDir = ( this.sortDir === 'desc' ) ? 'asc' : 'desc';
    this._getEvents();
  }

  private _getEvents(){
    this.wait = true;
    this.usersService.getUsersEvents(this.userID, 
                                     this.pageSize,
                                     this.pageNumber,
                                     this.sortCol,
                                     this.sortDir);

  
  }

  ngOnInit() {
    console.log("users-event-log works!");
    this._getEvents();
  }
  ngOnDestroy() {
    this.events$.unsubscribe();
  }

}
