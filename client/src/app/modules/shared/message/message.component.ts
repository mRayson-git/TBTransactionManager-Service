import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  
  constructor(public ms: MessageService) { }

  ngOnInit(): void { }

  msgColour(header: string): string {
    if (header === 'Danger message') {
      return '#f5897d';
    } else if (header === 'Success message') {
      return '#cef2b3';
    } else if (header === 'Warning message') {
      return '#faf09b';
    } else {
      return '#acbdfa';
    }
  }
  
}
