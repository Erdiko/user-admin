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
  private totalEvents: number;
  
  private userID: string;
  private pageSize: number;
  public currentPage: number;
  private sortCol: string;
  public sortDir: string;

  public pages: number[];

  private events$: Subscription;
  private eventsTotal$: Subscription;

  constructor(
    private usersService: UsersService
  ) {
    this.userID = null
    this.pageSize = 10;
    this.currentPage = 1;
    this.sortCol = null;
    this.sortDir = 'desc';

    this.pages = [];

    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

    this.usersService.events$.subscribe(
      () => this.wait = false
    )

    this.eventsTotal$ = this.usersService.eventsTotal$.subscribe(
      eventsTotal$ => this.totalEvents = eventsTotal$
    );

    this.usersService.eventsTotal$.subscribe(
      () => this._setPages()
    )

  }

  sort(){
    this.sortDir = ( this.sortDir === 'desc' ) ? 'asc' : 'desc';
    this._getEvents();
  }

  private _getEvents(){
    this.wait = true;
    this.usersService.getUsersEvents(this.userID, 
                                     this.pageSize,
                                     this.currentPage,
                                     this.sortCol,
                                     this.sortDir);
  }

  private _setPages(){
    this.pages = []; //reset page before setting pages
    for(let i = 1; i <= this.getPageCount(); i++){
      this.pages.push(i);
    }
  }

  clickPage(i){
      this.currentPage = i;
      this._getEvents();
  }

  clickPrev(){
      
      if(this.currentPage > 1){
        this.currentPage--;  
      }
      this._getEvents();
  }

  clickNext(){

      if(this.currentPage < this.getPageCount()){
        this.currentPage++;
      }
      this._getEvents();
  }

  getPageCount() {
    return Math.ceil(this.totalEvents / this.pageSize );
  }

  ngOnInit() {
    this._getEvents();
  }
  ngOnDestroy() {
    this.events$.unsubscribe();
  }

}
