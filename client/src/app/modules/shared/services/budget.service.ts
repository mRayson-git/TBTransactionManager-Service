import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Budget } from '../models/budget';
import { Reply } from '../models/reply';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetUrl = 'http://localhost:3000/api/budget/';
  budgetSubject: Subject<Budget> = new Subject<Budget>();
  budgets$ = this.budgetSubject.asObservable();

  constructor(private http: HttpClient, private ms: MessageService) { }

  saveBudget(budget: Budget): void {
    this.http.post<Reply>(this.budgetUrl + 'save', budget).subscribe(reply => {
      if (reply.success === 1){
        this.ms.addSuccessMessage(reply.message);
        this.getBudget(budget.userEmail);
      } else if (reply.success === 0) {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  getBudget(userEmail: string): void {
    this.http.get<Reply>(this.budgetUrl + 'get/' + userEmail).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
        reply.result3.forEach(budget => {
          this.budgetSubject.next(budget);
        });
      } else if (reply.success === 2) {
        this.ms.addWarningMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
    });
  }

  deleteBudget(budget: Budget): void {
    this.http.post<Reply>(this.budgetUrl + 'delete', budget).subscribe(reply => {
      if (reply.success === 1) {
        this.ms.addSuccessMessage(reply.message);
      } else {
        this.ms.addDangerMessage(reply.message);
      }
      this.getBudget(budget.userEmail);
    });
  }
}
