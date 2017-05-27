import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  public messages: any;
  private messageUpdate = new Subject<any>();

  constructor() {
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

  sendMessage(message, result) {
    let messageType = this.setMessageType(result);
    this.messageUpdate.next({body: message, type: messageType});
  }

  getMessage() {
    return this.messageUpdate.asObservable();
  }

  clearMessage() {
    this.messageUpdate.next(null);
  }
  
}
