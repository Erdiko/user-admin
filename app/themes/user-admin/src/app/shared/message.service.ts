import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  public messages: any;
  private messageUpdate = new Subject<any>();

  constructor() {
    this.messages = {
      
              'login': {
                  'success': "You have Successfully logged in",
                  'no-password': "Username or Password is invalid",
                  'no-access': "You need to login to gain access",
                  'error': "An error occurred. Please try again"
              },
              'logout': {
                  'success': "You have Successfully logged out",
                  'error': "You have been logged out unexpectedly"
              },
              'create-user': {
                  'success': "User was successfully created",
                  'error': "An error occurred. Please try again"
              },
              'edit-user': {
                  'success': "User record was successfully updated",
                  'error': "An error occurred. Please try again"
              },
              'edit-password': {
                  'success': "User password successfully updated",
                  'error': "An error occurred. Please try again"
              },
              'delete-user': {
                  'success': "User successfully deleted",
                  'error': "An error occured. Please try again"
              }

      }
  }

  setMessageType(result){
    switch(result){
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'danger';
    }
  }

  sendMessage(action, result) {
    let messageType = this.setMessageType(result);

    let message = this.messages[action][result];
    this.messageUpdate.next({body: message, type: messageType});
  }

  getMessage() {
    return this.messageUpdate.asObservable();
  }

  clearMessage() {
    this.messageUpdate.next(null);
  }
  

}
