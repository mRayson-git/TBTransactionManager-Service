import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parser } from '../../shared/models/parser';
import { Transaction } from '../../shared/models/transaction';
import { User } from '../../shared/models/user';
import { ParserService } from '../../shared/services/parser.service';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'app-modal-add-transaction',
  templateUrl: './modal-add-transaction.component.html',
  styleUrls: ['./modal-add-transaction.component.scss']
})
export class ModalAddTransactionComponent implements OnInit {

  @Input() currUser: User;
  @Input() parsers: Parser[];
  transForm: FormGroup;

  constructor(private ps: ParserService, private ts: TransactionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transForm = this.fb.group({
      bankAccountName: ['', Validators.required],
      transAmount: ['', Validators.required],
      transDate: ['', Validators.required],
      transPayee: ['', Validators.required],
      transCategory: ['Uncategorized', Validators.required],
      transNote: [''],
    });
  }

  addTransaction(): void {
    const transaction: Transaction = {
      userEmail: this.currUser.email,
      bankAccountName: this.parsers[this.transForm.get('bankAccountName').value].bankAccountName,
      bankAccountType: this.parsers[this.transForm.get('bankAccountName').value].bankAccountType,
      transAmount: this.transForm.get('transAmount').value,
      transDate: this.transForm.get('transDate').value,
      transPayee: this.transForm.get('transPayee').value,
      transType: 'Custom Transaction',
      transCategory: this.transForm.get('transCategory').value,
    }
    this.ts.saveCustomTransactions([transaction]);
  }

}
