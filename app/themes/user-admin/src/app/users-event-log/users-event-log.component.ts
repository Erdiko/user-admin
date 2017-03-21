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
  private eventsTotal: number;
  
  public userID: string;
  public pageSize: number;
  public currentPage: number;
  public sortCol: string;
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
    this.sortCol = 'id';
    this.sortDir = 'desc';

    this.pages = [];

    /**
     * Subscribe to the usersService to get events
     */
    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

    /**
     * When getting events is finished, hide the loading animation
     */
    this.usersService.events$.subscribe(
      () => this.wait = false
    )

    /**
     * Subscribe to the usersService to get total number of events
     */
    this.eventsTotal$ = this.usersService.eventsTotal$.subscribe(
      eventsTotal$ => this.eventsTotal = eventsTotal$
    );

    /**
     * When total number of events is known, set the pagination
     */
    this.usersService.eventsTotal$.subscribe(
      () => this._setPages()
    )

  }

  /**
   * Sorts event log specified by the parameter
   * @param {string} column - instruction specifying which column to sort
   */
  sort(column){
    if(this.sortCol != column){
      this.sortCol = column;
    }
    this.sortDir = ( this.sortDir === 'desc' ) ? 'asc' : 'desc';

    this._getEvents();
  }

  /**
   * Show loading animation while request for Users Event Log is being made
   */
  private _getEvents(){
    this.wait = true;
    this.usersService.getUsersEvents(this.userID, 
                                     this.pageSize,
                                     this.currentPage,
                                     this.sortCol,
                                     this.sortDir);
  }

  /**
   * Sets array of pages
   */
  private _setPages(){
    this.pages = []; //reset page before setting pages
    for(let i = 1; i <= this.getPageCount(); i++){
      this.pages.push(i);
    }
  }

  /**
   * Called when clicking on numbered link to get to certain page
   */
  clickPage(i){
      this.currentPage = i;
      this._getEvents();
  }

  /**
   * Called when clicking '<<' link to lead to proceeding page
   */
  clickPrev(){
      
      if(this.currentPage > 1){
        this.currentPage--;  
      }
      this._getEvents();
  }

  /**
   * Called when clicking '>>' link to lead to succeeding page
   */
  clickNext(){

      if(this.currentPage < this.getPageCount()){
        this.currentPage++;
      }
      this._getEvents();
  }

  /**
   * Get the number of pages necessary to house set of 10 event logs
   */
  getPageCount() {
    return Math.ceil(this.eventsTotal / this.pageSize );
  }

  /**
   * Calls for Events at the initialization of component
   */
  ngOnInit() {
    this._getEvents();
  }

  /**
   * Clean up by unsubscribing observables to avoid memory leak
   */
  ngOnDestroy() {
    this.events$.unsubscribe();
    this.eventsTotal$.unsubscribe();
  }

}
