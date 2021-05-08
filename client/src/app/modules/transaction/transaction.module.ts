import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionImporterComponent } from './transaction-importer/transaction-importer.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ModalAddTransactionComponent } from './modal-add-transaction/modal-add-transaction.component';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';



@NgModule({
  declarations: [TransactionComponent, TransactionImporterComponent, TransactionListComponent, ModalAddTransactionComponent, TransactionModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxCsvParserModule,
  ]
})
export class TransactionModule { }
