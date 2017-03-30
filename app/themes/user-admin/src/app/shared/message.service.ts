import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  private messageUpdate = new Subject<string>();
  private messages: any;

  constructor(){

    this.messages = {
    
      login: { 
        success: "Welcome [username here]!",
        noPassword: "Username or Password is invalid.",
        noAccess: "You need to login to gain access.",
        error: "An error occurred. Please try again."
      }

    }

  }

  messageUpdate$ = this.messageUpdate.asObservable();

  setMessage(method, result) {
    this.messageUpdate.next(this.messages[method][result]);
  }

}
