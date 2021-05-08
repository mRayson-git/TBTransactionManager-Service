import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reply } from '../models/reply';
import { Transaction } from '../models/transaction';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transUrl = 'http://localhost:3000/api/transaction/';
  transactionSubjet: Subject<Transaction> = new Subject<Transaction>();
  transactions$ = this.transactionSubjet.asObservable();
  recentlyAddedSubjet: Subject<Transaction> = new Subject<Transaction>();
  recentlyAdded$ = this.transactionSubjet.asObservable();

  constructor(private http: HttpClient, private ms: MessageService) { }

  saveTransactions(transactions: Transaction[]): void {
    this.http.post<Reply>(this.transUrl + 'save', transactions).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
        reply.result3.forEach(transaction => {
          this.recentlyAddedSubjet.next(transaction);
        });
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  saveCustomTransactions(transactions: Transaction[]): void {
    this.http.post<Reply>(this.transUrl + 'saveCustom', transactions).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
        reply.result3.forEach(transaction => {
          this.recentlyAddedSubjet.next(transaction);
        });
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  getTransactions(userEmail: string, accountType: string, transPayee: string, transCategory: string, numberOfResults: number): void {
    this.http.get<Reply>(this.transUrl + 'get/' + userEmail + '&' + accountType + '&' + transPayee + '&' + transCategory + '&' + numberOfResults).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
        reply.result3.forEach(transaction => {
          this.transactionSubjet.next(transaction);
        });
      } else if (reply.success === 2) {
        this.ms.addWarningMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  updateTransaction(trans: Transaction): void {
    this.http.post<Reply>(this.transUrl + 'update', trans).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  updateCategories(userEmail: string): void {
    this.http.get<Reply>(this.transUrl + 'updateCategories/' + userEmail).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
      } else if (reply.success === 2) {
        this.ms.addWarningMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
      this.getTransactions(userEmail, '.*', '.*', '.*', 0);
    });
  }
}
