
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageSubject: Subject<Message> = new Subject<Message>();
  messages$ = this.messageSubject.asObservable();

  toasts: Message[] = [];

  constructor() { }

  addDangerMessage(content: string): void {
    this.toasts.push({ header: 'Danger message', content: content });
  }

  addWarningMessage(content: string): void {
    this.toasts.push({ header: 'Warning message', content: content });
    console.log(this.toasts);
  }

  addSuccessMessage(content: string): void {
    this.toasts.push({ header: 'Success message', content: content });
  }

  addInfoMessage(content: string): void {
    this.toasts.push({ header: 'Info message', content: content });
  }

  remove(toast: Message): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
