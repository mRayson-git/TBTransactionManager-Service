import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Parser } from '../../shared/models/parser';
import { Transaction } from '../../shared/models/transaction';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { ParserService } from '../../shared/services/parser.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { ModalAddTransactionComponent } from '../modal-add-transaction/modal-add-transaction.component';

@Component({
  selector: 'app-transaction-importer',
  templateUrl: './transaction-importer.component.html',
  styleUrls: ['./transaction-importer.component.scss']
})
export class TransactionImporterComponent implements OnInit {

  importForm: FormGroup;
  currUser: User;
  parsers: Parser[] = [];
  addedTransactions: Transaction[] = [];

  constructor(private ps: ParserService,
    private ts: TransactionService,
    private auth: AuthService,
    private fb: FormBuilder,
    private ngxParser: NgxCsvParser,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.importForm = this.fb.group({
      parser: ['', Validators.required],
      file: [''],
    });
    this.currUser = this.auth.getUser();
    this.ps.parsers$.subscribe(parser => {
      this.parsers.push(parser);
    });
    this.ps.getParsers(this.currUser.email);
    this.ts.transactions$.subscribe(transaction => {
      this.addedTransactions.push(transaction);
    });
  }

  importTransactions(files: FileList): void {
    const fileToParse: File = files.item(0);
    const selectedProfile = this.parsers[this.importForm.get('parser').value];
    const transactions: Transaction[] = [];

    this.ngxParser.parse(fileToParse, { header: false, delimiter: ',' })
    .pipe().subscribe((result: Array<any>) => {
      // If there is a header, remove first entry
      if (selectedProfile.hasHeader){
        result.shift();
      }
      result.forEach(transaction => {
        transactions.push({
          userEmail: this.currUser.email,
          bankAccountName: selectedProfile.bankAccountName,
          bankAccountType: selectedProfile.bankAccountType,
          transDate: new Date(transaction[selectedProfile.dateCol]),
          transAmount: transaction[selectedProfile.amountCol],
          transPayee: transaction[selectedProfile.payeeCol] || '???',
          transType: transaction[selectedProfile.typeCol],
          transCategory: 'Uncategorized'
        });
      });
      this.ts.saveTransactions(transactions);
    });
    this.importForm.get('file').reset();
  }

  openTransactionModal(): void {
    const modalRef = this.modalService.open(ModalAddTransactionComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.currUser = this.currUser;
    modalRef.componentInstance.parsers = this.parsers;
  }
}
