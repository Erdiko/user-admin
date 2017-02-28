import { Component, OnInit } from '@angular/core';

import { UsersService }   from '../shared/users.service';
import { User } from '../shared/models/user.model';


@Component({
  selector: 'app-user-event-log',
  templateUrl: './user-event-log.component.html',
  styleUrls: ['./user-event-log.component.scss']
})
export class UserEventLogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
