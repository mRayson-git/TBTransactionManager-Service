import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createThis } from 'typescript';
import { Budget } from '../../shared/models/budget';
import { Parser } from '../../shared/models/parser';
import { Transaction } from '../../shared/models/transaction';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { BudgetService } from '../../shared/services/budget.service';
import { ParserService } from '../../shared/services/parser.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  currDate: Date;
  currUser: User;
  budgets: Budget[] = [];
  parsers: Parser[] = [];
  transactionList: Transaction[] = [];
  title = 'All';

  searchForm: FormGroup;
  categories = [ ];
  payees = [];
  dates = [];

  constructor(private ts: TransactionService,
    private auth: AuthService,
    private modalService: NgbModal,
    private bs: BudgetService,
    private ps: ParserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currUser = this.auth.getUser();
    this.bs.budgets$.subscribe(budget => {
      this.budgets.push(budget);
    });
    this.ps.parsers$.subscribe(parser => {
      this.parsers.push(parser);
    });
    this.ts.transactions$.subscribe(transaction => {
      this.transactionList.push(transaction);
      if (!this.categories.includes(transaction.transCategory)){
        this.categories.push(transaction.transCategory);
        this.categories.sort();
      }
      if (!this.payees.includes(transaction.transPayee)){
        this.payees.push(transaction.transPayee);
        this.payees.sort();
      }
    });
    this.searchForm = this.fb.group({
      accountType: ['.*'],
      transPayee: ['.*'],
      transCategory: ['.*'],
      numberOfResults: [100],
    });
    this.currDate = new Date();
    console.log(this.currDate.toISOString().slice(0,7));
    this.search();
    this.bs.getBudget(this.currUser.email);
  }

  showTransactionModal(trans: Transaction): void {
    const modalRef = this.modalService.open(TransactionModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.trans = trans;
    modalRef.componentInstance.budgets = this.budgets;
    modalRef.componentInstance.parsers = this.parsers;
  }

  updateCategories(): void {
    this.transactionList = [];
    this.ts.updateCategories(this.currUser.email);
  }

  search(): void {
    this.transactionList = [];
    this.ts.getTransactions(this.currUser.email,
      this.searchForm.get('accountType').value,
      this.searchForm.get('transPayee').value,
      this.searchForm.get('transCategory').value,
      this.searchForm.get('numberOfResults').value);
  }

}
