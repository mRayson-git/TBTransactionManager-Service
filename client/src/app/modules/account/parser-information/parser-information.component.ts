import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parser } from '../../shared/models/parser';
import { ParserService } from '../../shared/services/parser.service';

@Component({
  selector: 'app-parser-information',
  templateUrl: './parser-information.component.html',
  styleUrls: ['./parser-information.component.scss']
})
export class ParserInformationComponent implements OnInit {

  parser: Parser;
  parserForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private ps: ParserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parser = {
        email: params['email'],
        bankAccountName: params['bankAccountName'],
        bankAccountType: params['bankAccountType'],
        hasHeader: params['hasHeader'],
        dateCol: params['dateCol'],
        amountCol: params['amountCol'],
        payeeCol: params['payeeCol'],
        typeCol: params['typeCol']
      }
    });
    this.parserForm = this.fb.group({
      email: [this.parser.email],
      hasHeader: [this.parser.hasHeader],
      bankAccountName: [{ value: this.parser.bankAccountName, disabled: true }],
      bankAccountType: [this.parser.bankAccountType],
      dateCol: [this.parser.dateCol],
      amountCol: [this.parser.amountCol],
      payeeCol: [this.parser.payeeCol],
      typeCol: [this.parser.typeCol]
    });
  }

  updateParser(): void {
    const parser: Parser = {
      email: this.parser.email,
      bankAccountName: this.parserForm.get('bankAccountName').value,
      bankAccountType: this.parserForm.get('bankAccountType').value,
      hasHeader: this.parserForm.get('hasHeader').value,
      dateCol: this.parserForm.get('dateCol').value,
      amountCol: this.parserForm.get('amountCol').value,
      payeeCol: this.parserForm.get('payeeCol').value,
      typeCol: this.parserForm.get('typeCol').value,
    };
    console.log(parser);
    this.ps.updateParser(parser);
    this.router.navigate(['/accountSettings']);
  }

  deleteParser(): void {
    this.ps.deleteParser(this.parser);
    this.router.navigate(['/accountSettings']);
  }

}
