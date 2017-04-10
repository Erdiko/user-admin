import { Component, OnDestroy } from '@angular/core';
import { MessageService }   from '../shared/message.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnDestroy {

  private messageType: string;
  private message: any;
  private messageSubscription: Subscription;

  constructor(private messageService: MessageService) { 

    this.messageSubscription = this.messageService
                                   .getMessage()
                                   .subscribe(message => {
                                      console.log('subscribe message!', message)
                                      this.message = message
                                    });
  }

  ngOnDestroy() {
    //Memory Leak is bad.
    this.messageSubscription.unsubscribe();
  }

}
