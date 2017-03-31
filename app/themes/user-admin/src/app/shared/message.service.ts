import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  public messages: any;
  private messageUpdate = new Subject<any>();

  constructor() {
    this.messages = {
      
              login: {
                  noPassword: "Username or Password is invalid.",
                  noAccess: "You need to login to gain access.",
                  error: "An error occurred. Please try again."
              },
              logout: {
                  success: "You have Successfully logged out.",
                  error: "You have been logged out unexpectedly."
              }

      }
  }

  

  sendMessage(action, result) {
    let message = this.messages[action][result];
    console.log("send message", message);
    this.messageUpdate.next(message);
  }

  getMessage() {
    console.log("get message");
    return this.messageUpdate.asObservable();
  }
  

}
