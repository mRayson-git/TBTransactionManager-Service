import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Parser } from '../models/parser';
import { Reply } from '../models/reply';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  parserUrl = "http://localhost:3000/api/parser/";
  parserSubject: Subject<Parser> = new Subject<Parser>();
  parsers$ = this.parserSubject.asObservable();

  constructor(private http: HttpClient, private ms: MessageService) { }

  // Save parser
  saveParser(parser: Parser): void {
    this.http.post<Reply>(this.parserUrl + 'save', parser).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
    this.getParsers(parser.email);
  }

  // Update Parser
  updateParser(parser: Parser): void {
    this.http.post<Reply>(this.parserUrl + 'update', parser).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  // Get parsers
  getParsers(userEmail: string): void {
    this.http.get<Reply>(this.parserUrl + 'get/' + userEmail).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
        reply.result3.forEach(parser => {
          this.parserSubject.next(parser);
        });
      } else if(reply.success === 2) {
        this.ms.addWarningMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  // Delete parser
  deleteParser(parser: Parser): void {
    this.http.post<Reply>(this.parserUrl + 'delete', parser).subscribe(reply => {
      if (reply.success) {
        this.ms.addSuccessMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }
}
