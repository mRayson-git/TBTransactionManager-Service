import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Budget } from '../../shared/models/budget';
import { Parser } from '../../shared/models/parser';
import { Transaction } from '../../shared/models/transaction';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent implements OnInit {

  @Input() trans: Transaction;
  @Input() budgets: Budget[];
  @Input() parsers: Parser[];
  transForm: FormGroup;

  constructor(private fb: FormBuilder, private ts: TransactionService) { }

  ngOnInit(): void {
    console.log(this.budgets);
    this.transForm = this.fb.group({
      transCategory: [this.trans.transCategory, Validators.required],
      transCustomCategory: [''],
      transNote: [this.trans.transNote],
    });

  }

  updateTransaction(): void {
    const customCat = this.transForm.get('transCustomCategory').value;
    if ( customCat !== ''){
      this.trans.transCategory = customCat;
    } else {
      this.trans.transCategory = this.transForm.get('transCategory').value;
    }
    this.trans.transNote = this.transForm.get('transNote').value;
    this.ts.updateTransaction(this.trans);
  }

}
